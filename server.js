import express from "express";
import dotenv from 'dotenv'

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

import cors from "cors";
import morgan from "morgan";

// connect mongoDB
import { connectMongoDB } from "./src/config/dbConfig.js";
connectMongoDB();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routers
import userRouter from "./src/routers/userRouter.js";
import transRouter from "./src/routers/transRouter.js";
import { userAuth } from "./src/middlewares/authMiddleware.js";
// user Router to handle user registration and login
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", userAuth, transRouter);

//transtaction router to handle all transaction related CRUD operations

// uncought router request

app.use("*", (req, res, next) => {
  const error = {
    errorCode: 404,
    message: "Requested resources not found!",
  };
  next(error);
});

// global error handler
app.use((error, req, res, next) => {
  try {
    console.log(error.message);
    const errorCode = error.errorCode || 500;

    res.status(errorCode).json({
      status: "error",
      message: error.message,
    });
  } catch (error) {
    res.status(5000).json({
      status: "error",
      message: error.message,
    });
  }
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
