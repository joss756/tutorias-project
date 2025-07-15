import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
  console.log("Verificando autenticación...");
  if (this.auth.isAuthenticated()) {
    console.log("Usuario autenticado");
    return true;
  } else {
    console.warn("Usuario no autenticado");
    this.router.navigate(['/login']);
    return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class RoleGuardAdmin implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (this.auth.getRol() === 'administrador') return true;
    this.router.navigate(['/dashboard']);
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class RoleGuardTutor implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (this.auth.getRol() === 'tutor') return true;
    this.router.navigate(['/dashboard']);
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      // Si NO está logueado, deja entrar a /login
      return true;
    }
    // Si ya está logueado, redirige al dashboard según su rol:
    const rol = this.auth.getUsuarioActual()?.rol;
    if (rol === 'administrador') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard/solicitudes']);
    }
    return false;
  }

}

@Injectable({ providedIn: 'root' })
export class RoleGuardEstudiante implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getRol() === 'estudiante') {
      return true;
    }
    // redirige al dashboard general si no es estudiante
    this.router.navigate(['/dashboard']);
    return false;
  }
}


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const rol = this.auth.getRol();
    const rolesPermitidos = ['estudiante', 'administrador', 'tutor'];

    if (rol && rolesPermitidos.includes(rol)) {
      console.log('✅ Acceso permitido para el rol:', rol);
      return true;
    }

    console.warn('❌ Acceso denegado. Rol inválido:', rol);
    this.router.navigate(['/login']);
    return false;
  }


}



