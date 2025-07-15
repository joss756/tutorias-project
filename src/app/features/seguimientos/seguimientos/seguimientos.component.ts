// src/app/features/seguimientos/seguimientos/seguimientos.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeguimientosService, Seguimiento } from '../seguimientos.service';

@Component({
  selector: 'app-seguimientos',
  standalone: false,
  templateUrl: './seguimientos.component.html',
})
export class SeguimientosComponent implements OnInit {
  seguimientos: Seguimiento[] = [];

  constructor(
    private svc: SeguimientosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const sesionId = Number(this.route.snapshot.paramMap.get('sesionId'));
    this.svc.listar(sesionId).subscribe(list => this.seguimientos = list);
  }
}
