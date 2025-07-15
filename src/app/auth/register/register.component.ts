import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model = {
    nombre: '',
    correo: '',
    password: '',
    rol: ''
  };

  mensaje = '';

  constructor(private http: HttpClient, private router: Router) {
    this.initFirebase(); // Inicializamos Firebase al cargar el componente (solo una vez por proyecto)
  }

  initFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyCmK37oQO_pEnan_JnmqIxOJzFaC7ngT4s",
      authDomain: "autenticacion-b7919.firebaseapp.com",
      projectId: "autenticacion-b7919",
      storageBucket: "autenticacion-b7919.firebasestorage.app",
      messagingSenderId: "532779153783",
      appId: "1:532779153783:web:89fbb3978464e9246b8972",
      measurementId: "G-27N1LBQEEX"
    };

    initializeApp(firebaseConfig);
  }

  loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      const usuarioGoogle = {
        nombre: user.displayName,
        correo: user.email,
        password: user.uid,  // puedes usar UID de Firebase como contraseña temporal
        rol: 'estudiante' // puedes cambiarlo si quieres que sea tutor o admin
      };

      // 🔁 Intentamos registrar (si ya existe, backend puede ignorarlo o lanzar error controlado)
      this.http.post<any>('http://localhost:3000/api/auth/register', usuarioGoogle)
        .subscribe({
          next: res => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('usuario', JSON.stringify(res));
            this.router.navigate(['/dashboard/solicitudes']);
          },
          error: err => {
            console.warn('Usuario ya registrado, intentando login');

            // 🔁 Si ya existe, hacemos login
            this.http.post<any>('http://localhost:3000/api/auth/login', {
              correo: usuarioGoogle.correo,
              password: usuarioGoogle.password
            }).subscribe({
              next: res => {
                localStorage.setItem('token', res.token);
                localStorage.setItem('usuario', JSON.stringify(res));
                this.router.navigate(['/dashboard/solicitudes']);
              },
              error: e => {
                console.error(' No se pudo iniciar sesión con Google:', e);
              }
            });
          }
        });

    }).catch(error => {
      console.error(" Error en autenticación con Google:", error);
    });
}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/api/auth/register', this.model)
      .subscribe({
        next: res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('usuario', JSON.stringify(res));

          if (res.rol === 'estudiante') {
            this.router.navigate(['/dashboard/solicitudes']);
          } else if (res.rol === 'tutor') {
            this.router.navigate(['/dashboard']); // ajusta si tienes una ruta para tutores
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: err => {
          console.error(err);
          this.mensaje = 'Error al registrarse: ' + (err.error?.message || 'Intenta de nuevo');
        }
      });
  }
}



