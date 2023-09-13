export interface MyResponse<T> {
  status: 'Ok' | 'Created';
  statusCode: 200 | 201;
  message: string;
  reply: T;
}
