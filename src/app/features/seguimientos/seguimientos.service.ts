import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Seguimiento {
  id: number;
  id_sesion: number;
  id_estudiante: number;
  comentarios: string;
  calificacion: number;
  fecha: string;
}

@Injectable({ providedIn: 'root' })
export class SeguimientosService {
  private api = 'http://localhost:3000/api/seguimientos';
  constructor(private http: HttpClient) {}

  listar(sesionId: number): Observable<Seguimiento[]> {
    return this.http.get<Seguimiento[]>(`${this.api}/${sesionId}`);
  }
  crear(data: Partial<Seguimiento>): Observable<Seguimiento> {
    return this.http.post<Seguimiento>(this.api, data);
  }
}
