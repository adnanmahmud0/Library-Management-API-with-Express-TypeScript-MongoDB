import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import { errorHandler } from "./app/middlewares/errorHandler";

const app: Application = express();

app.use(express.json());


app.use("/api", booksRoutes);

app.use("/api", borrowRoutes);

app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to node app');
});


export default app;