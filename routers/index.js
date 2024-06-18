import { Router } from 'express';
import BookRouter from './BookRouter.js';
import UserRouter from './UserRouter.js';

const router = Router();

router.use('/books', BookRouter);
router.use('/users', UserRouter);

export default router;