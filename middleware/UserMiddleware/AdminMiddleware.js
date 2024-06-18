import TokenService from '../../services/TokenService.js';
import ApiError from '../../error/ApiError.js';

export default function(req, res, next) {
    try {
        const { authorization } = req.headers;
        const accessToken = authorization?.split(' ')[1];
        const userData = TokenService.validateAccessToken(accessToken);
  
        if (!userData.is_admin) {
            return next(ApiError.forbidden('Нет доступа'));
        };

        req.user = userData;
        next();
    } catch(err) {
        return next(ApiError.unauthorizedError());
    }
};