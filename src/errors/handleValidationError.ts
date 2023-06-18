import { Error } from "mongoose";
import { IErrorMessage, IErrorResponse } from "../interface/IErrorMessage";

const handleValidationError = (
  error: Error.ValidationError
): IErrorResponse => {
  const errorMessage: IErrorMessage[] = Object.values(error.errors).map(
    (error) => ({ path: error.path, message: error.message })
  );

  const status = 400;
  const message = error.message;
  return { status, message, errorMessage };
};

export default handleValidationError;