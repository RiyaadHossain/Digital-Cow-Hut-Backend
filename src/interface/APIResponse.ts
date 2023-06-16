export type IAPIResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null;
};
