import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './pages/home/home.module';
import { BaseTemplateComponent } from './template/base-template/base-template.component';
import { LoginModule } from './pages/login/login.module';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => LoginModule
  },
  {
    path: '',
    component: BaseTemplateComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => HomeModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
