import { finalize, catchError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
//

export const paymentInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const currentUrl = router.url;
  const isMonopayCheckStatus = req.url.includes('/api/monopay/check-status');

  //
  if (isMonopayCheckStatus) {
  }
  //
  return next(req).pipe(
    catchError((err) => {
      console.error('HTTP Error:', err.message);
      throw err;
    })
  );
};
