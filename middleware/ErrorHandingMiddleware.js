import AppError from '../error/ApiError.js';

export default function(err, req, res, next) {
    if (err instanceof AppError) {
        res.status(err.status).json({ message: err.message });
    };

    console.log(err);
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
};