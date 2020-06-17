import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancasComponent } from './financas.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ FinancasComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: FinancasComponent
            }
        ])
    ],
    providers: [
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'BRL'
        }
    ]
})
export class FinancasModule {  }
