import TokenService from '../../services/TokenService.js';
import ApiError from '../../error/ApiError.js';

export default function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unauthorizedError());
        };

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) {
            return next(ApiError.unauthorizedError());
        };

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.unauthorizedError());
        };

        req.user = userData;
        next();
    } catch(err) {
        return next(ApiError.unauthorizedError());
    }
};