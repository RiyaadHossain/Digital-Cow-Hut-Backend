import { Response } from "express";
import { IAPIResponse } from "../interface/APIResponse";

const sendResponse = <T>(res: Response, responseData: IAPIResponse<T>) => {
  const response: IAPIResponse<T> = {
    statusCode: responseData.statusCode,
    success: responseData.success,
    message: responseData.message,
    data: responseData.data,
  };
  res.send(responseData.statusCode).json(response);
};

export default sendResponse;
