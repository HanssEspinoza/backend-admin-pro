export interface MyResponse<T> {
  status: 'OK' | 'Created';
  statusCode: 200 | 201;
  message: string;
  reply: T;
}
