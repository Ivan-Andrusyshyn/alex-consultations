import { finalize, catchError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.showLoadingSpinner();
  return next(req).pipe(
    finalize(() => {
      return loadingService.hideLoadingSpinner();
    }),
    catchError((err) => {
      console.error('HTTP Error:', err.message);
      throw err;
    })
  );
};
