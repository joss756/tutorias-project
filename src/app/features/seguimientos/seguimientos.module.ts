import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientosRoutingModule } from './seguimientos-routing.module';
import { SeguimientosComponent } from './seguimientos/seguimientos.component';


@NgModule({
  declarations: [
    SeguimientosComponent
  ],
  imports: [
    CommonModule,
    SeguimientosRoutingModule
  ]
})
export class SeguimientosModule { }
