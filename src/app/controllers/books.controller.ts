import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();

booksRoutes.post('/books', async (req: Request, res: Response, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate entry',
                error: `A book with the ISBN '${req.body.isbn}' already exists.`
            });
        }
        next(error);
    }
});

booksRoutes.get('/books', async (req: Request, res: Response, next) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query: any = {};

        if (filter) query.genre = filter;
        const sortOrder = sort === 'asc' ? 1 : -1;

        const books = await Book.find(query)
            .sort({ [sortBy as string]: sortOrder })
            .limit(parseInt(limit as string));

        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    } catch (error) {
        next(error);
    }
});

booksRoutes.get('/books/:bookId', async (req: Request, res: Response, next) => {
    try {
        const book = await Book.findById(req.params.bookId);

        res.status(book ? 200 : 404).json({
            success: !!book,
            message: book ? 'Book retrieved successfully' : 'Book not found',
            data: book || null,
        });
    } catch (error) {
        next(error);
    }
});

booksRoutes.put('/books/:bookId', async (req: Request, res: Response, next) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });

        res.status(updatedBook ? 200 : 404).json({
            success: !!updatedBook,
            message: updatedBook ? 'Book updated successfully' : 'Book not found',
            data: updatedBook || null,
        });
    } catch (error) {
        next(error);
    }
});

booksRoutes.delete('/books/:bookId', async (req: Request, res: Response, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId);

        res.status(deletedBook ? 200 : 404).json({
            success: !!deletedBook,
            message: deletedBook ? 'Book deleted successfully' : 'Book not found',
            data: deletedBook || null,
        });

    } catch (error) {
        next(error);
    }
});
