export type IAllDataReturnType<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type JWTPayload = {
  _id: string;
  role: string;
};

export type LogInReturn = {
  accessToken: string;
  refreshToken: string;
};

export type IUserCredential = { phoneNumber: string; password: string };
