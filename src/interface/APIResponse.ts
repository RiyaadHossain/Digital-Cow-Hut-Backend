import { IMeta } from "./common";

export type IAPIResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: IMeta;
  data?: T | null;
};
