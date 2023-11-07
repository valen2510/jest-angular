export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  response?: T;
}
