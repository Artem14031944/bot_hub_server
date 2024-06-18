import { Token } from "../models/models.js";
import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: '30d' });

        return {
            accessToken, 
            refreshToken
        }
    };

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
            return userData;
        } catch (e) {
            return null;
        }
    };

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
            return userData;
        } catch (e) {
            return null;
        }
    };

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: { userId }});
        if (tokenData) {
            const tokenDataUpadate = await Token.update({ refreshToken }, { where: { id: tokenData.id } });
            return tokenDataUpadate;
        }

        const token = await Token.create({ userId, refreshToken });
        if (!token) {
            throw ApiError.badRequest('Ошибка при создание токена')
        }
        return token;
    };

    async removeToken(refreshToken) {
        const token = await Token.findOne({ where: { refreshToken } });
        const tokenData = await Token.destroy({ where: { id: token.id } }).catch(err => console.log(err, 'err'));
        return tokenData;
    };

    async findToken(refreshToken) {
        const tokenDate = await Token.findOne({ where: { refreshToken }});
        return tokenDate;
    };
};

export default new TokenService();