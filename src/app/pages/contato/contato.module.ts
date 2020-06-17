import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContatoComponent } from './contato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContatoService } from 'src/app/service/contato.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ContatoComponent
            }
        ])
    ],
    declarations: [ ContatoComponent ],
    providers: [ ContatoService ]
})
export class ContatoModule {  }
