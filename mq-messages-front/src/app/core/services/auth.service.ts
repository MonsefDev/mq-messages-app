import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUser = signal<User | null>(null);
  user = this.currentUser.asReadonly();

  public login(username: string, password: string) {
    return this.http
      .post<{ access_token: string; user: User }>('/api/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.access_token);
          this.currentUser.set(response.user);
        })
      );
  }

  public logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return !!localStorage.getItem('token');
  }

  public getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('token');
  }

  public hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }

  public canAccess(resource: string): boolean {
    const role = this.currentUser()?.role;
    if (!role) {
      return false;
    }
    const permissions: Record<string, string[]> = {
      admin: ['messages', 'partners', 'users'],
      user: ['messages', 'partners'],
      viewer: ['messages'],
    };

    return permissions[role]?.includes(resource) || false;
  }
}
