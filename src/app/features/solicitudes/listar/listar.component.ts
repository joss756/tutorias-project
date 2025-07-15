import { Component, OnInit } from '@angular/core';
import { SolicitudesService, Solicitud } from '../solicitudes.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  solicitudes: Solicitud[] = [];

  constructor(private svc: SolicitudesService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
  this.svc.listar().subscribe({
    next: data => {
      this.solicitudes = data;
      console.log('Solicitudes cargadas', data); // 👈 agrega este log
    },
    error: err => {
      console.error('Error al listar solicitudes', err);
    }
  });
  }

  onEdit(id: number):void {
    this.router.navigate(['/dashboard/solicitudes/editar',id]);
  }

  onDelete(id: number) {
  if (confirm('¿Estás seguro de eliminar esta solicitud?')) {
    this.svc.eliminar(id).subscribe({
      next: () => {
        this.solicitudes = this.solicitudes.filter(s => s.id !== id);
        this.toastr.success(' Solicitud eliminada correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar', err);
        this.toastr.error(' Error al eliminar solicitud');
      }
    });
    }
  }
}



