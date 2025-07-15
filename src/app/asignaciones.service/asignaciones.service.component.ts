// src/app/asignaciones.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError, throwError } from 'rxjs';

export interface Asignacion {
  id: number;
  id_solicitud: number;
  id_tutor: number;
  fecha_asignacion: string;
}

@Injectable({ providedIn: 'root' })
export class AsignacionesService {
  private api = 'http://localhost:3000/api/asignaciones';

  constructor(private http: HttpClient) {}

  listar(): Observable<Asignacion[]> {
    return this.http.get<Asignacion[]>(this.api).pipe(
      tap(list => console.log('Asignaciones recibidas:', list))
    );
  }

  asignarManual(data: { id_solicitud: number; id_tutor: number }) {
    return this.http.post<Asignacion>(this.api, data).pipe(
      tap(res => console.log('asignarManual response:', res))
    );
  }

  asignarAuto(data: { id_solicitud: number }) {
  return this.http.post<Asignacion>(`${this.api}/auto`, data).pipe(
    tap(res => console.log('▶ asignarAuto OK', res)),
    catchError(err => {
      console.error('✖ asignarAuto Error', err);
      return throwError(() => err);
    })
  );
  }

  addAsignCal(asig: Asignacion) {
  console.log('Calendar click:', asig);
  const start = new Date(asig.fecha_asignacion).toISOString().replace(/-|:|\.\d\d\d/g,'');
  const url = `https://www.google.com/calendar/render?action=TEMPLATE
    &text=Asignación%20Tutoría%20ID:${asig.id}
    &dates=${start}/${start}
    &details=Solicitud%20ID:${asig.id_solicitud}
    &sf=true&output=xml`.replace(/\s+/g,'');
  window.open(url, '_blank');
}

}




