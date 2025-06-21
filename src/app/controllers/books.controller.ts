import express, { Request, Response } from "express";
import { Book } from "../models/books.controller";

export const booksRoutes = express.Router()

booksRoutes.post('/books', async (req: Request, res: Response) => {

    const body = req.body;
    const data = await Book.create(body);

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data
    })
});

booksRoutes.get('/books', async (req: Request, res: Response) => {

    const body = req.body;
    const data = await Book.find(body);

    res.status(201).json({
        "success": true,
        "message": "Books retrieved successfully",
        data
    })
});

booksRoutes.get('/books/:bookId', async (req: Request, res: Response) => {

    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
    });
});

booksRoutes.patch('/books/:bookId', async (req: Request, res: Response) => {

    const bookId = req.params.bookId;

    const updatedBody = req.body;

    const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true })

    res.status(201).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
    });
});

booksRoutes.delete('/books/:bookId', async (req: Request, res: Response) => {

    const bookId = req.params.bookId;

    const book = await Book.findByIdAndDelete(bookId, { new: true })

    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: book,
    })
});