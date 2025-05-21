import { exec } from "child_process";
import express, { Request, Response } from "express";
import { asyncHandler, errorHandler, notFound } from "./errors/errorHandler";
import { AppError } from "./errors/AppError";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Log
app.use(morgan("combined"));

// Example of async route with error handling
const asyncExample = async (req: Request, res: Response) => {
  // Simulate an async operation that might fail
  const result = await Promise.resolve("Success");
  if (!result) {
    throw new AppError("Operation failed", 400);
  }
  res.json({ message: result });
};

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express TypeScript API" });
});

// Example API routes with async error handling
app.get(
  "/api/hello",
  asyncHandler(async (req: Request, res: Response) => {
    res.json({ message: "Hello, World!" });
  })
);

app.post(
  "/api/echo",
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.body) {
      throw new AppError("No data provided", 400);
    }
    res.json({ received: req.body });
  })
);

// Example route that might throw an error
app.get(
  "/api/error-example",
  asyncHandler(async (req: Request, res: Response) => {
    throw new AppError("This is a test error", 400);
  })
);

app.get(
  "/api/goldsky",
  asyncHandler(async (req: Request, res: Response) => {
    const pipelineInfoStr = await execRun(`goldsky pipeline list`);
    res.json(pipelineInfoStr);
  })
);

/**
 * Executes a command in a shell.
 * Returns a promise that resolves with the command's output.
 * @param cmd - Command to run
 * @returns Promise<string> - The output of the command
 */
const execRun = (cmd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, _stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

console.log("process.env", process.env);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
