import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroUsuarioComponent } from './cadastro-usuario.component';
import { RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@NgModule({
    declarations: [ CadastroUsuarioComponent ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: CadastroUsuarioComponent
            }
        ])
    ],
    exports: [ CadastroUsuarioComponent ],
    providers: [ UsuarioService ]
})
export class CadastroUsuarioModule {  }
