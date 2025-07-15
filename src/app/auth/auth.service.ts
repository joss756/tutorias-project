import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
          const user = {
            id: res.id,
            nombre: res.nombre,
            correo: res.correo,
            rol: res.rol
          };
          localStorage.setItem('usuario', JSON.stringify(user));
        }
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
  }

  getUsuarioActual(): any {
  const user = localStorage.getItem('usuario');
  return user ? JSON.parse(user) : null;
}


  getRol(): string | null {
  const userStr = localStorage.getItem('usuario');
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user.rol || null;
  } catch (e) {
    return null;
  }
}

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }
}
