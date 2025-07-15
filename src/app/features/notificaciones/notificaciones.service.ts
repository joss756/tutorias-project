// src/app/features/notificaciones/notificaciones.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notificacion {
  id: number;
  id_usuario: number;
  mensaje: string;
  leida: boolean;
  fecha: string;
}

@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  private api = 'http://localhost:3000/api/notificaciones';

  constructor(private http: HttpClient) {}

  // Ahora recibe el ID de usuario
  listar(usuarioId: number): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.api}/usuario/${usuarioId}`);
  }

  marcarLeida(id: number): Observable<any> {
    return this.http.put(`${this.api}/${id}/leer`, {});
  }
}
