// src/app/features/materias/materias.module.ts
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { MateriasRoutingModule } from './materias-routing.module';

import { ListarMateriasComponent } from './listar-materias/listar-materias.component';
import { CrearMateriaComponent }   from './crear-materia/crear-materia.component';
import { EditarMateriaComponent }  from './editar-materia/editar-materia.component';

@NgModule({
  declarations: [
    ListarMateriasComponent,
    CrearMateriaComponent,
    EditarMateriaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MateriasRoutingModule
  ]
})
export class MateriasModule {}
