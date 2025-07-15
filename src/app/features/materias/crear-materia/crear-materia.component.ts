// src/app/features/materias/crear-materia/crear-materia.component.ts
import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { MateriasService } from '../materias.service';

@Component({
  selector: 'app-crear-materia',
  standalone: false,
  templateUrl: './crear-materia.component.html',
})
export class CrearMateriaComponent {
  model = { nombre: '' };
  mensaje = '';

  constructor(
    private svc: MateriasService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.svc.crear(this.model).subscribe({
      next: () => this.router.navigate(['../']),
      error: err => this.mensaje = 'Error creando materia'
    });
  }
}
