// src/app/features/materias/materias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Materia {
  id: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class MateriasService {
  private api = 'http://localhost:3000/api/materias';

  constructor(private http: HttpClient) {}

  listar(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.api);
  }

  crear(data: Pick<Materia, 'nombre'>): Observable<Materia> {
    return this.http.post<Materia>(this.api, data);
  }

  obtener(id: number): Observable<Materia> {
    return this.http.get<Materia>(`${this.api}/${id}`);
  }

  actualizar(materia: Materia): Observable<Materia> {
    return this.http.put<Materia>(`${this.api}/${materia.id}`, materia);
  }

   eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

