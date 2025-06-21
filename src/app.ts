import { notEqual } from "assert";
import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { version } from "os";
import { Book } from "./app/models/books.controller";
import { booksRoutes } from "./app/controllers/books.controller";

const app: Application = express();

app.use(express.json())


app.use("/api", booksRoutes)


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to node app');
});

export default app;