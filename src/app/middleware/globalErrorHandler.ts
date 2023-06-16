import { ErrorRequestHandler } from "express-serve-static-core";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import { IErrorMessage } from "../../interface/IErrorMessage";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessage: IErrorMessage[] = [];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  }

  const success = false;
  res.status(statusCode).json({ statusCode, success, message, errorMessage });
};

export default globalErrorHandler;
