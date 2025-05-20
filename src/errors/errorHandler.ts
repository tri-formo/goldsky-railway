import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

// Handle async errors
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Handle 404 errors
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

// Global error handler
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Handle mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  // Handle mongoose duplicate key errors
  if (err.name === "MongoError" && (err as any).code === 11000) {
    return res.status(400).json({
      status: "fail",
      message: "Duplicate field value entered",
    });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token. Please log in again",
    });
  }

  // Handle JWT expired errors
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "fail",
      message: "Your token has expired. Please log in again",
    });
  }

  // Default error
  console.error("ERROR 💥", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
    stack: err.stack,
  });
};
