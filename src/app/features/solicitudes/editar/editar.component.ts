import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudesService, Solicitud } from '../solicitudes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  standalone: false,
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  solicitud: Solicitud = {
    id: 0,
    tema: '',
    estado: '',
    id_estudiante: 0,
    id_materia: 0
  };

  constructor(
    private route: ActivatedRoute,
    private svc: SolicitudesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.svc.obtener(id).subscribe({
    next: data => this.solicitud = data,
    error: err => {
      console.error('Error al cargar solicitud', err);
      this.toastr.error('❌ Error al cargar los datos de la solicitud');
      this.router.navigate(['/dashboard/solicitudes']);
    }
  });
}

  onSubmit() {
  this.svc.actualizar(this.solicitud).subscribe({
    next: () => {
      this.toastr.success('✅ Solicitud actualizada correctamente');
      this.router.navigate(['/dashboard/solicitudes']);
    },
    error: (err) => {
      console.error('Error al actualizar solicitud', err);
      this.toastr.error('❌ Error al actualizar solicitud');
    }
  });
  }
}

