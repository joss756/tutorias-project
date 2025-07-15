import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginComponent,
    FormsModule
  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ]
})
export class AuthModule { }
