import { User } from '../models/models.js';
import { v4 } from 'uuid';
import TokenService from '../services/TokenService.js'
import MailService from '../services/MailService.js';
import ApiError from '../error/ApiError.js';
import UserDto from '../dtos/UserDto.js';
import bcrypt from 'bcrypt';

class UserService {
    async register(username, password, email, is_admin) {
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже есть`);
        }

        const activation_link = v4();
        const hashPassword = await bcrypt.hash(password, 8);
        const updatedActivationLink = `${process.env.API_URL}/api/users/activate/${activation_link}`;

        try {
            await MailService.sendActivationMail({ username, email }, updatedActivationLink);
        } catch(err) {
            throw ApiError.invalidMailbox(err.message);
        };

        const user = await User.create({ username, email, password: hashPassword, activation_link, is_admin });
        if (!user) {
            throw ApiError.badRequest('Не удалось создать пользователь');
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        if (!tokens) {
            throw ApiError.badRequest('Не удалось сгенерировать токены');
        }

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    };

    async login(email, password) {
        const user = await User.findOne({ where: { email }});
        if (!user) {
            throw ApiError.badRequest(`Пользователь ${email} не зарегистрирован`);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.badRequest('Неверный пароль или логин');
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    };

    async activate(activation_link) {
        const user = await User.findOne({ where: { activation_link } });
        if (!user) {
            throw ApiError.badRequest('Неккоректная ссылка активации');
        }

        await User.update({ is_activated: 1 }, { where: { id: user.id } });
    };

    async getOne(id) {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            throw ApiError.badRequest('Такой пользователь отсутствует'); 
        }

        return user;
    };

    async infoAboutUser(authorization) {
        const accessToken = authorization.split(' ')[1];        
        const user = TokenService.validateAccessToken(accessToken);
        const userData = new UserDto(user);

        return userData;
    };

    async update(id, role) {
        await User.update({ role }, { where: { id } });
        const updatedUser = this.getOne(id);

        return updatedUser;
    };
};

export default new UserService();