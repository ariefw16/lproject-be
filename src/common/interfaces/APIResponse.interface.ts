export interface APIResponse<T> {
  success: boolean;
  status: any;
  message: string;
  data: T;
  meta?: {
    total: number | null;
    per_page: number | null;
    current_page: number | null;
    last_page: number | null;
  };
}
