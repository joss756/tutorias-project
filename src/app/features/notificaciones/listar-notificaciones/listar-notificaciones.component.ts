// src/app/features/notificaciones/listar-notificaciones/listar-notificaciones.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificacionesService, Notificacion } from '../notificaciones.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-listar-notificaciones',
  standalone: false,
  templateUrl: './listar-notificaciones.component.html',
})
export class ListarNotificacionesComponent implements OnInit {
  notificaciones: Notificacion[] = [];
  error = '';

  constructor(
    private svc: NotificacionesService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const usuario = this.auth.getUsuarioActual();
    if (!usuario?.id) {
      this.error = 'No se pudo determinar el usuario';
      return;
    }

    this.svc.listar(usuario.id).subscribe({
      next: (lista) => this.notificaciones = lista,
      error: (err) => this.error = 'Error al cargar notificaciones'
    });
  }

  marcarLeida(notif: Notificacion) {
    this.svc.marcarLeida(notif.id).subscribe(() => {
      notif.leida = true;
    });
  }
}


