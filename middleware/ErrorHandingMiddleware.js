import AppError from '../error/ApiError.js';

export default function(err, req, res, next) {
    if (err instanceof AppError) {
        res.status(err.status).json({ message: err.message });
    };
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
};