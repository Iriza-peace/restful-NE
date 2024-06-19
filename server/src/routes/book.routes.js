import express from 'express';
// import { getAllBooks,getBooks,createBook } from '../controllers/books.controller.js';
import { getBooks, createBook, getAllBooks,deleteBook } from '../controllers/books.controller.js';
// import authenticate from '../middlewares/auth.middleware.js';
import { validateBookRegistration} from '../validators/book.validate.js';
const router = express.Router();


//First login to perform the following operations
router.get("/",getBooks);
router.get("/all",getAllBooks);
router.post("/register",validateBookRegistration, createBook)
 router.delete("/delete/:id",deleteBook);

export default router;

