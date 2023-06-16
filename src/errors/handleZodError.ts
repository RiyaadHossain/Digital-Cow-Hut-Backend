import { ZodError } from "zod";
import { IErrorMessage, IErrorResponse } from "../interface/IErrorMessage";

const handleZodError = (error: ZodError): IErrorResponse => {
  const errorMessage: IErrorMessage[] = error.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  const status = 400;
  const message = "Validation Error";

  return { status, message, errorMessage };
};

export default handleZodError;
