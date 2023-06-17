import { ZodError } from "zod";
import { ErrorRequestHandler } from "express-serve-static-core";
import { IErrorMessage } from "../../interface/IErrorMessage";
import handleZodError from "../../errors/handleZodError";
import handleCastError from "../../errors/handleCastError";
import handleValidationError from "../../errors/handleValidationError";
import config from "../../config";
import { APIError } from "../../interface/APIError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  const success = false;
  let message = "Something went wrong!";
  let errorMessage: IErrorMessage[] = [];
  if (error.name == "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error.name == "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof APIError) {
    statusCode = 400;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    statusCode,
    success,
    message,
    errorMessage,
    stack: config.NODE_ENV == "development" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
