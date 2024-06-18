import { Router } from 'express';
import BookRouter from './BookRouter.js';
import UserRouter from './UserRouter.js';

const router = Router();

router.use('/book', BookRouter);
router.use('/user', UserRouter);

export default router;