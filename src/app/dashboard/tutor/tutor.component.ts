import { Component, OnInit } from '@angular/core';
import { SesionesService, Sesion } from '../../sesiones.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./tutor.component.css'],
  templateUrl: './tutor.component.html'
})
export class TutorComponent implements OnInit {
  sesiones: Sesion[] = [];

  constructor(
    private sesSvc: SesionesService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const usuario = this.auth.getUsuarioActual();
    console.log('Tutor actual desde AuthService:', usuario);
    const idTutor = usuario?.id;
    console.log('ID usado para sesiones:', idTutor);

    if (!idTutor) {
      console.error('No se encontró el ID del tutor');
      return;
    }

    this.sesSvc.listarPorTutor(idTutor).subscribe({
      next: sesiones => {
        console.log('Sesiones recibidas:', sesiones);
        this.sesiones = sesiones;
      },
      error: err => {
        console.error('Error al cargar sesiones:', err);
      }
    });
  }

  addSesionCal(ses: Sesion) {
    const start = new Date(ses.fecha_sesion).toISOString().replace(/-|:|\.\d\d\d/g,'');
    const end = new Date(new Date(ses.fecha_sesion).getTime() + (ses.duracion || 60)*60000)
      .toISOString().replace(/-|:|\.\d\d\d/g,'');
    const url = `https://www.google.com/calendar/render?action=TEMPLATE
      &text=Sesión%20Tutoría%20ID:${ses.id}
      &dates=${start}/${end}
      &details=Modalidad:${ses.modalidad}%20Estado:${ses.estado}
      &sf=true&output=xml`.replace(/\s+/g,'');
    window.open(url, '_blank');
  }
}

