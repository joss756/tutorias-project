import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule }      from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SolicitudesModule } from './features/solicitudes/solicitudes.module';
import { TokenInterceptor } from './auth/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AsignacionesService } from './asignaciones.service/asignaciones.service.component';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { UsuariosService } from './usuarios.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { MateriasModule } from './features/materias/materias.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    SocialLoginModule,
    SolicitudesModule,
    BrowserAnimationsModule,
    AuthModule,
    DashboardModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    MateriasModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AsignacionesService,
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
