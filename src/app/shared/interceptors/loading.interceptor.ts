import { finalize, catchError, tap } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.showLoadingSpinner();
  return next(req).pipe(
    tap((event) => {
      if ('status' in event && (event.status === 200 || event.status === 201)) {
        loadingService.hideLoadingSpinner();
      }
    }),

    catchError((err) => {
      console.error('HTTP Error:', err.message);
      throw err;
    }),
    finalize(() => {
      loadingService.hideLoadingSpinner();
    })
  );
};
