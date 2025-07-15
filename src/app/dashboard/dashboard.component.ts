// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService }        from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  usuario: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.auth.getUsuarioActual();
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    // redirige al primer enlace permitido
    if (this.usuario.rol === 'administrador') {
      this.router.navigate(['dashboard/asignaciones']);
    } else if (this.usuario.rol === 'tutor') {
      this.router.navigate(['dashboard/sesiones']);
    } else {
      this.router.navigate(['dashboard/solicitudes']);
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}


