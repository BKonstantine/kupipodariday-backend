import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PasswordWishInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => {
            const {
              owner: { password, ...ownerWithoutPassword },
              ...rest
            } = user;
            return { ...rest, owner: ownerWithoutPassword };
          });
        } else {
          const {
            owner: { password, ...ownerWithoutPassword },
            ...rest
          } = data;
          return { ...rest, owner: ownerWithoutPassword };
        }
      }),
    );
  }
}
