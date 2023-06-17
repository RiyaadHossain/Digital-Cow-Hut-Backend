import { Response } from "express";
import { IAPIResponse } from "../interface/APIResponse";

const sendResponse = <T>(res: Response, responseData: IAPIResponse<T>) => {
  const response: IAPIResponse<T> = {
    statusCode: responseData.statusCode,
    success: responseData.success,
    message: responseData.message,
    meta: responseData.meta,
    data: responseData.data,
  };
  res.status(responseData.statusCode).json(response);
};

export default sendResponse;
