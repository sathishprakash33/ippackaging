import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { tap } from 'rxjs';

const TOKEN_KEY = 'lp.admin.token';
const USER_KEY = 'lp.admin.user';

export interface AdminLoginResponse {
  token: string;
  expiresAt: string;
  username: string;
  configPageFlag: string;
}

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly token = signal<string | null>(sessionStorage.getItem(TOKEN_KEY));
  readonly username = signal<string | null>(sessionStorage.getItem(USER_KEY));
  readonly isLoggedIn = computed(() => !!this.token());

  constructor(private readonly http: HttpClient) {}

  tokenValue(): string | null {
    return this.token();
  }

  login(username: string, password: string) {
    return this.http
      .post<AdminLoginResponse>('/api/admin/auth/login', { username, password })
      .pipe(tap((response) => this.remember(response)));
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    this.token.set(null);
    this.username.set(null);
  }

  private remember(response: AdminLoginResponse): void {
    sessionStorage.setItem(TOKEN_KEY, response.token);
    sessionStorage.setItem(USER_KEY, response.username);
    this.token.set(response.token);
    this.username.set(response.username);
  }
}
