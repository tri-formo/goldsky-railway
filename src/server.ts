import { exec } from "child_process";
import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express TypeScript API" });
});

// Example API routes
app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

app.post("/api/echo", (req: Request, res: Response) => {
  res.json({ received: req.body });
});

app.get("/api/goldsky", async (req: Request, res: Response) => {
  const pipelineInfoStr = await execRun(`goldsky pipeline list`);
  res.json(pipelineInfoStr);
});

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

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
