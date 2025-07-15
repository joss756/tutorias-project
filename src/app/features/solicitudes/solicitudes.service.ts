import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Solicitud {
  id: number;
  id_estudiante: number;
  id_materia: number;
  tema: string;
  estado?: string;
  fecha_solicitud?: Date;
}

@Injectable({ providedIn: 'root' })
export class SolicitudesService {
  private apiUrl = 'http://localhost:3000/api/solicitudes';
  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Trae todas las solicitudes
  listar(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.api}/solicitudes`);
}

  eliminar(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

  // Crea una nueva solicitud
  crear(data: Partial<Solicitud>): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl, data);
  }

  obtener(id: number): Observable<Solicitud> {
  return this.http.get<Solicitud>(`${this.api}/solicitudes/${id}`);
}

  actualizar(solicitud: Solicitud): Observable<any> {
  return this.http.put(`${this.api}/solicitudes/${solicitud.id}`, solicitud);
}
  // Lista las solicitudes de un estudiante específico
  listarPorEstudiante(id_estudiante: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/estudiante/${id_estudiante}`);
  }

  getAsignadasAlTutor(tutorId: number): Observable<Solicitud[]> {
  return this.http.get<Solicitud[]>(`http://localhost:3000/api/solicitudes/tutor/${tutorId}`);
}


}

