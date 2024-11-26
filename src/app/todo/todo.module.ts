import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent // La route pour le composant CvTech
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  TodoModule { }
