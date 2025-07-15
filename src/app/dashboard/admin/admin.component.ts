// src/app/dashboard/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { AsignacionesService, Asignacion } from '../../asignaciones.service/asignaciones.service.component';
import { SolicitudesService, Solicitud }   from '../../features/solicitudes/solicitudes.service';
import { AuthService }                     from '../../auth/auth.service';
import { UsuariosService, Usuario }        from '../../usuarios.service';
import { SesionesService }                 from '../../sesiones.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  solicitudes: Solicitud[]     = [];
  asignaciones: Asignacion[]   = [];
  tutores: Usuario[]           = [];
  selValue: number              = 0;  // valor numérico por defecto

  sesionForm = {
  id_asignacion: 0,
  fecha_sesion: '',
  duracion: 60,
  modalidad: 'en línea'
};

  constructor(
    private solSvc: SolicitudesService,
    private asgSvc: AsignacionesService,
    private userSvc: UsuariosService,
    private auth: AuthService,
    private sesSvc: SesionesService
  ) {}

  ngOnInit() {
    // 1) Carga solicitudes pendientes
    this.solSvc.listar()
      .subscribe(s => this.solicitudes = s.filter(x => x.estado === 'pendiente'));

    // 2) Carga asignaciones existentes
    this.asgSvc.listar()
      .subscribe(a => this.asignaciones = a);

    // 3) Carga tutores y define selValue inicial
    this.userSvc.listarPorRol('tutor')
      .subscribe(t => {
        this.tutores = t;
        if (t.length) {
          this.selValue = t[0].id;
        }
      });
  }

  manual(solId: number) {
    console.log('Manual clic:', solId, this.selValue);
    this.asgSvc.asignarManual({ id_solicitud: solId, id_tutor: this.selValue })
      .subscribe(() => this.ngOnInit());
  }

  auto(solId: number) {
    console.log('Auto clic:', solId);
    this.asgSvc.asignarAuto({ id_solicitud: solId })
      .subscribe(() => this.ngOnInit());
  }

  onCrearSesion(form: any) {
  this.sesSvc.crearSesion(form).subscribe({
    next: s => {
      alert(`Sesión creada con ID ${s.id}`);
      this.ngOnInit(); // recarga asignaciones y sesiones
    },
    error: err => alert(`Error creando sesión: ${err.error?.error}`)
  });
}

  addAsignCal(asig: Asignacion) {
    console.log('Calendar clic:', asig);
    const start = new Date(asig.fecha_asignacion)
      .toISOString().replace(/-|:|\.\d\d\d/g,'');
    const url = `https://www.google.com/calendar/render?action=TEMPLATE
      &text=Asignación%20Tutoría%20ID:${asig.id}
      &dates=${start}/${start}
      &details=Solicitud%20ID:${asig.id_solicitud}
      &sf=true&output=xml`.replace(/\s+/g,'');
    window.open(url, '_blank');
  }
}

