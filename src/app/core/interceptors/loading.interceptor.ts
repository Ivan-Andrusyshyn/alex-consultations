import { finalize, catchError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
//

import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const router = inject(Router);

  const currentUrl = router.url;
  const isMonopayCheckStatus = req.url.includes('/api/monopay/check-status');
  const isQuestionsRoute = currentUrl.endsWith('/questions');

  //
  const shouldSkipSpinner = isMonopayCheckStatus && isQuestionsRoute;

  if (!shouldSkipSpinner) {
    loadingService.showLoadingSpinner();
  }
  //
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
