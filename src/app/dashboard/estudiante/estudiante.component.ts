import { Component, OnInit } from '@angular/core';
import { SolicitudesService, Solicitud } from '../../features/solicitudes/solicitudes.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-estudiante',
  standalone: false, // No es necesario, pero se puede dejar para mantener la consistencia
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  solicitudes: Solicitud[] = [];    // ← La propiedad debe estar declarada
  usuarioId!: number;               // ← Para guardar el id del estudiante

  constructor(
    private solicitudesSvc: SolicitudesService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const usuario = this.auth.getUsuarioActual();
    if (usuario?.id) {
      this.usuarioId = usuario.id;
      this.solicitudesSvc.listar()
        .subscribe((data: Solicitud[]) => {
          // Filtramos solo las solicitudes de este estudiante
          this.solicitudes = data.filter(s => s.id_estudiante === this.usuarioId);
        }, err => {
          console.error('Error al cargar solicitudes:', err);
        });
    }
  }

  addToCalendar(solicitud: any): void {
  const fecha = new Date(solicitud.fecha_solicitud);
  const fechaFormateada = fecha.toISOString().replace(/-|:|\.\d\d\d/g,"");

  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=Tutoría: ${solicitud.tema}&dates=${fechaFormateada}/${fechaFormateada}&details=Estado: ${solicitud.estado}&sf=true&output=xml`;

  window.open(url, '_blank');
}

}



