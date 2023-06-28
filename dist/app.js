"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./app/routes");
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application Route
app.use("/api/v1/", routes_1.applicationRoutes);
// Health Check
app.get("/", (req, res) => {
    res.send("Hello from Digital Cow Hut! 🐮");
});
// Global Error Hanlder
app.use(globalErrorHandler_1.default);
// Not Found API Error
/* app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found!",
    errorMessages: [{ path: req.originalUrl, message: "API Not Found!" }],
  });
  next();
}); */
exports.default = app;
