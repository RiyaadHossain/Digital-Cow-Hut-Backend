import { Error } from "mongoose";
import { IErrorMessage, IErrorResponse } from "../interface/IErrorMessage";

const handleCastError = (error: Error.CastError): IErrorResponse => {
  const errorMessage: IErrorMessage[] = [
    { path: error.path, message: error.message },
  ];

  const status = 400;
  const message = "Invalid ID";

  return { status, message, errorMessage };
};

export default handleCastError;
