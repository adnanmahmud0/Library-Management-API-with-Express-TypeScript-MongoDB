import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

app.use(express.json())

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        author: {
            type: String,
            required: [true, 'Author is required'],
            trim: true,
        },
        genre: {
            type: String,
            required: [true, 'Genre is required'],
            enum: {
                values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
                message: 'Invalid genre',
            },
        },
        isbn: {
            type: String,
            required: [true, 'ISBN is required'],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        copies: {
            type: Number,
            required: [true, 'Copies is required'],
            min: [0, 'Copies must be a positive number'],
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


const Book = model("Book", bookSchema)

app.post('/api/books', async (req: Request, res: Response) => {

    const body = req.body;
    const data = await Book.create(body);

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data
    })
})

app.get('/api/books', async (req: Request, res: Response) => {

    const body = req.body;
    const data = await Book.find(body);

    res.status(201).json({
        "success": true,
        "message": "Books retrieved successfully",
        data
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to node app');
})

export default app;