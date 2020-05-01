import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './app.main';
import { DoneTasksComponent } from './app.doneTasks';
import { NewTaskComponent } from './app.newTask';


const appRoutes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'done', component: DoneTasksComponent},
  {path: 'new', component: NewTaskComponent},
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
