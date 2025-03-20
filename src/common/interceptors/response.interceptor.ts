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
  implements NestInterceptor<T, APIResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<APIResponse<T>> {
    return next.handle().pipe(
      map((response: any) => {
        const data = response?.data ?? response;
        const meta = response?.meta ?? undefined;

        return {
          success: true,
          status: context.switchToHttp().getResponse().statusCode,
          message: 'Request Successful',
          data: data,
          ...(meta !== undefined ? { meta } : {}),
        };
      }),
    );
  }
}
