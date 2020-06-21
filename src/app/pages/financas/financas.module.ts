import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancasComponent } from './financas.component';
import { RouterModule } from '@angular/router';
import { DatexModule, TipoModule, StatusModule } from 'src/app/pipe';
import { NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ FinancasComponent ],
    imports: [
        CommonModule,
        DatexModule,
        StatusModule,
        TipoModule,
        NgbModalModule,
        NgbDatepickerModule,
        FormsModule,
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
