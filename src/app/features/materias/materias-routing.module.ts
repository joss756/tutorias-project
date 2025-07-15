// src/app/features/materias/materias-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarMateriasComponent } from './listar-materias/listar-materias.component';
import { CrearMateriaComponent }  from './crear-materia/crear-materia.component';
import { EditarMateriaComponent } from './editar-materia/editar-materia.component';

const routes: Routes = [
  { path: '',           component: ListarMateriasComponent },
  { path: 'crear',      component: CrearMateriaComponent  },
  { path: 'editar/:id', component: EditarMateriaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasRoutingModule {}

