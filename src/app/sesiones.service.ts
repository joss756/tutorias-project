import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sesion {
  id: number;
  id_asignacion: number;
  fecha_sesion: string;
  duracion: number;
  modalidad: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class SesionesService {
  private api = 'http://localhost:3000/api/sesiones';

  constructor(private http: HttpClient) {}

  listarPorTutor(idTutor: number): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(`${this.api}/tutor/${idTutor}`);
  }

  crearSesion(data: { id_asignacion: number; fecha_sesion: string; duracion: number; modalidad: string; }): Observable<Sesion> {
    return this.http.post<Sesion>(this.api, data);
  }
}

