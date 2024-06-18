import { Router } from "express";
import AdminMiddleware from '../middleware/UserMiddleware/AdminMiddleware.js';
import BookController from "../controllers/BookController.js";

const router = Router();

router.get('/', BookController.getAll);
router.get('/:id', BookController.getOne);
router.post('/', AdminMiddleware, BookController.create);
router.put('/:id', AdminMiddleware, BookController.update);
router.delete('/:id', AdminMiddleware, BookController.delete);

export default router;