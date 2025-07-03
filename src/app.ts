import express, { Request, Response } from "express";
import cors from "cors"; 
import { errorHandler } from "./app/middlewares/errorHandler";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api", booksRoutes);
app.use("/api", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Libary Management API");
});

// Error handler middleware
app.use(errorHandler);

export default app;
