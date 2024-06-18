import { Book } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class BookService {
    async getAll() {
        const books = await Book.findAll();
        return books;
    };

    async getOne(id) {
        const book = await Book.findOne({ where: { id } });
        if (!book) {
            throw ApiError.badRequest('Такая книга отсутствует');
        }

        return book;
    };

    async create(user_id, title, author, genres) {
        const newBook = await Book.create({ user_id, title, author, genres });
        if (!newBook) {
            throw ApiError.badRequest('Не удолось создать книгу');
        }

        return newBook;
    };

    async update(reqBody, id) {
        await Book.update(reqBody, { where: { id } });
        const updatedBook =  this.getOne(id);
    
        return updatedBook;
    };

    async delete(id) {
        const bookDeleted = await Book.destroy({ where: { id } });
        if (!bookDeleted) {
            throw ApiError.badRequest('Не удолось удалить книгу');
        }

        return bookDeleted;
    };
};

export default new BookService();