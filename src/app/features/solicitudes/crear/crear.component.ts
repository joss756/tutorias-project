import { SolicitudesService } from './../solicitudes.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud } from '../solicitudes.service'; // Asegúrate de que la ruta es correcta
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear',
  standalone: false,
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  model: Partial<Solicitud> = {
    id_estudiante: 1,
    id_materia: 1,
    tema: '',
    estado: 'pendiente',
  };
  mensaje = '';

  constructor(
    private svc: SolicitudesService,
    private router: Router,
    private toastr: ToastrService// Asegúrate de que ToastrModule está importado en tu módulo
  ) {}

   onSubmit() {
    this.svc.crear(this.model).subscribe({
      next: sol => {
        this.toastr.success('✅ Solicitud creada con ID ' + sol.id);
        setTimeout(() => this.router.navigate(['/dashboard/solicitudes']), 2000);
      },
      error: err => {
        console.error(err);
        this.toastr.error('❌ Error creando solicitud');
      }
    });
  }
}

