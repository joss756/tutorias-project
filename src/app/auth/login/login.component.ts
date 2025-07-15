import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
  model = { correo: '', password: '' };
  error = '';
  mensaje = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}


  onSubmit() {
  console.log("Datos enviados:", this.model);
  this.auth.login(this.model).subscribe({
    next: res => {
      console.log("Login exitoso:", res);

      const usuario = this.auth.getUsuarioActual();

      // ✅ Redirección según el rol
      if (usuario.rol === 'estudiante' || usuario.rol === 'tutor') {
        this.router.navigate(['/dashboard/solicitudes']);
      } else if (usuario.rol === 'administrador') {
        this.router.navigate(['/dashboard']);
      } else {
        console.warn("Rol desconocido, redirigiendo a login");
        this.router.navigate(['/login']);
      }
    },
    error: err => {
      console.error('Error en el login:', err);
      this.mensaje = '❌ Correo o contraseña incorrectos';
    }
  });
}

}



