import { Router } from 'express';
import AdminMiddleware from '../middleware/UserMiddleware/AdminMiddleware.js';
import AuthMiddleware from '../middleware/UserMiddleware/AuthMiddleware.js';
import UserConttoller from '../controllers/UserConttoller.js';

const router = Router();

router.post('/register', UserConttoller.register);
router.post('/login', UserConttoller.login);
router.get('/activate/:link', UserConttoller.activate);
router.get('/me', AuthMiddleware, UserConttoller.infoAboutUser);
router.put('/:id', AdminMiddleware, UserConttoller.update);

export default router;