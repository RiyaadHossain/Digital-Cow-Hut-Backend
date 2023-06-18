export type IAllDataReturnType<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
