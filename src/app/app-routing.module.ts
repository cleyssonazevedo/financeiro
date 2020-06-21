import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './pages/home/home.module';
import { BaseTemplateComponent } from './template/base-template/base-template.component';
import { LoginModule } from './pages/login/login.module';
import { Page404Module } from './pages/404/page-404.module';
import { Page500Module } from './pages/500/page-500.module';
import { SobreModule } from './pages/sobre/sobre.module';
import { ContatoModule } from './pages/contato/contato.module';
import { FinancasModule } from './pages/financas/financas.module';
import { LoginGuardService } from './service/login.guard.service';
import { CadastroUsuarioModule } from './pages/cadastro-usuario/cadastro-usuario.module';

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
      },
      {
        path: 'sobre',
        pathMatch: 'full',
        loadChildren: () => SobreModule
      },
      {
        path: 'contato',
        pathMatch: 'full',
        loadChildren: () => ContatoModule
      },
      {
        path: 'financas',
        canActivate: [ LoginGuardService ],
        loadChildren: () => FinancasModule
      },
      {
        path: 'usuario',
        children: [
          {
            path: 'cadastro',
            pathMatch: 'full',
            loadChildren: () => CadastroUsuarioModule
          }
        ]
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
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
