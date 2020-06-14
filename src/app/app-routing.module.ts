import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './pages/home/home.module';
import { BaseTemplateComponent } from './template/base-template/base-template.component';
import { LoginModule } from './pages/login/login.module';
import { Page404Module } from './pages/404/page-404.module';
import { Page500Module } from './pages/500/page-500.module';

const routes: Routes = [
  {
    path: '500',
    pathMatch: 'full',
    loadChildren: () => Page500Module
  },
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
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => Page404Module
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
