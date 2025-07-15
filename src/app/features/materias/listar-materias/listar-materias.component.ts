// src/app/features/materias/listar-materias/listar-materias.component.ts
import { Component, OnInit } from '@angular/core';
import { MateriasService, Materia } from '../materias.service';

@Component({
  selector: 'app-listar-materias',
  standalone: false,
  templateUrl: './listar-materias.component.html',
  styleUrls: ['./listar-materias.component.css']
})
export class ListarMateriasComponent implements OnInit {
  materias: Materia[] = [];

  constructor(private svc: MateriasService) {}

  ngOnInit(): void {
    this.svc.listar().subscribe({
      next: data => this.materias = data,
      error: err => console.error('Error al listar materias', err)
    });
  }
}
