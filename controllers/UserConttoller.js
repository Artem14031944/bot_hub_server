import UserService from "../services/UserService.js";

class UserContoller {
    async register(req, res, next) {
        try {
            const { username, password, email, is_admin } = req.body;
            const userData = await UserService.register(username, password, email, is_admin);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        } catch(err) {
            next(err);
        }
    };

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        } catch(err) {
            next(err);
        }
    };

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            if (!activationLink) {
                throw new Error('Ошибка с ссылкой')
            }
            await UserService.activate(activationLink);
            const html = `<div>Congratulations, you have activated</div>`;

            res.writeHeader(200, { "Content-Type": "text/html" });  
            res.write(html);  
            res.end();  
        } catch(err) {
            next(err);
        }
    };

    async infoAboutUser(req, res, next) {
        try {
            const { authorization } = req.headers;
            const userData = await UserService.infoAboutUser(authorization);
          
            return res.json(userData);
        } catch(err) {
            next(err);
        }
    };

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { role } = req.query;
            const updatedUser = await UserService.update(id, role);

            return res.json(updatedUser);
        } catch(err) {
            next(err);
        }
    };
};

export default new UserContoller();