import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, EMPTY } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      console.error('HTTP Error:', err.message);
      return throwError(() => err);
    })
  );
};
