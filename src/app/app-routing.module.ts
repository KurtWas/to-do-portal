import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateTodoFormComponent} from './create/components/create-todo-form/create-todo-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'create-todo'
  },
  {
    path: 'create-todo',
    component: CreateTodoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
