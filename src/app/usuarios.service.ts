import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private api = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  listarPorRol(rol: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.api}?rol=${rol}`);
  }
}

