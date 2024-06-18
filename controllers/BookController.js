import BookService from '../services/BookService.js';

class BookContoller {
    async getAll(req, res, next) {
        try {
            const books = await BookService.getAll();

            return res.json(books);
        } catch(err) {
            next(err);
        }
    };

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const book = await BookService.getOne(id);


            return res.json(book);
        } catch(err) {
            next(next);
        }
    };
    
    async create(req, res, next) {
        try {
            const { user_id, title, author, genres } = req.body;
            const newBook = await BookService.create(user_id, title, author, genres);

            return res.json(newBook);
        } catch(err) {
            next(err);
        }
    };

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updatedBook = await BookService.update(req.body, id);

            return res.json(updatedBook);
        } catch(err) {
            next(err);
        } 
    };

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const bookDeleted = await BookService.delete(id);

            return res.json(bookDeleted);
        } catch(err) {
            next(err);
        } 
    };
};

export default new BookContoller();