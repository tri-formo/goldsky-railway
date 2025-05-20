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

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
