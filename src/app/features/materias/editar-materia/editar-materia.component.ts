// src/app/features/materias/editar-materia/editar-materia.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService, Materia } from '../materias.service';

@Component({
  selector: 'app-editar-materia',
  standalone: false,
  templateUrl: './editar-materia.component.html',
})
export class EditarMateriaComponent implements OnInit {
  model: Materia = { id: 0, nombre: '' };
  mensaje = '';

  constructor(
    private svc: MateriasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.svc.obtener(id).subscribe({
      next: m => this.model = m,
      error: err => this.mensaje = 'No se encontró la materia'
    });
  }

  onSubmit(): void {
    this.svc.actualizar(this.model).subscribe({
      next: () => this.router.navigate(['../']),
      error: err => this.mensaje = 'Error actualizando materia'
    });
  }
}
