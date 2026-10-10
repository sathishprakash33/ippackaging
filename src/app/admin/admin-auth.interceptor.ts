import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

export const adminAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  const token = auth.tokenValue();
  const isLogin = req.url.includes('/api/admin/auth/login');
  const authed =
    token && req.url.startsWith('/api/') && !isLogin
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(authed).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isLogin) {
        auth.logout();
        void router.navigateByUrl('/admin/login');
      }
      return throwError(() => error);
    }),
  );
};

export function apiErrorMessage(error: unknown, fallback: string): string {
  const body = (error as { error?: { error?: { message?: string }; message?: string } })?.error;
  return body?.error?.message || body?.message || fallback;
}
