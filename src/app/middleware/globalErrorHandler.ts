import { ErrorRequestHandler } from "express-serve-static-core";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {};

export default globalErrorHandler;
