import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { APIResponse } from '../interfaces/APIResponse.interface';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, APIResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<APIResponse<T>> {
    return next.handle().pipe(
      map((response: any) => {
        const data = response?.data ?? response;
        const meta = response?.meta ?? undefined;
        const status =
          response?.status ?? context.switchToHttp().getResponse().statusCode;
        const success = response?.success ?? true;
        const message = response?.message ?? 'Request Successful';

        return {
          success,
          status,
          message,
          data: data,
          ...(meta !== undefined ? { meta } : {}),
        };
      }),
    );
  }
}
