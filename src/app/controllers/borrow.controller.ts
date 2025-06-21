import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/books.model";

export const borrowRoutes = express.Router();


Book.schema.statics.updateAvailability = async function (bookId: string) {
    const book = await this.findById(bookId);
    if (!book) return;

    if (book.copies === 0) {
        book.available = false;
        await book.save();
    }
};

borrowRoutes.post('/borrow', async (req: Request, res: Response, next) => {

    try {
        const { book: bookId, quantity, dueDate } = req.body;

        if (!bookId || !quantity || !dueDate) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                error: 'book, quantity, and dueDate are required'
            });
        }

        // Find the book to borrow
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null,
            });
        }

        // Find the book copies
        if (!book.available || book.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough copies available',
                data: null,
            });
        }

        // remove copies from book
        book.copies -= quantity;

        // Save updated copies
        await book.save();

        // Update availability
        await Book.updateAvailability(bookId);

        // Create borrow record
        const borrowRecord = await Borrow.create({
            book: bookId,
            quantity,
            dueDate,
        });

        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrowRecord,
        });

    } catch (error) {
        next(error);
    }
});


borrowRoutes.get('/borrow', async (req: Request, res: Response, next) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            { $unwind: '$bookInfo' },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    } catch (error) {
        next(error);
    }
});
