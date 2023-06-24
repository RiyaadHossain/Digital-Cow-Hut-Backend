import cors from "cors";
import cookieParser from "cookie-parser";
import { applicationRoutes } from "./app/routes";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
const app: Application = express();

// Middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Route
app.use("/api/v1/", applicationRoutes);

// Health Check
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Digital Cow Hut! 🐮");
});

// Global Error Hanlder
app.use(globalErrorHandler);















// Not Found API Error
/* app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found!",
    errorMessages: [{ path: req.originalUrl, message: "API Not Found!" }],
  });
  next();
}); */

export default app;
