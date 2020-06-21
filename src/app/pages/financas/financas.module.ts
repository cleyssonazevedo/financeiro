import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancasComponent } from './financas.component';
import { RouterModule } from '@angular/router';
import { DatexModule, TipoModule, StatusModule } from 'src/app/pipe';
import { NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FinancasResolverService } from './financas-resolver.service';
import { FinancasService } from 'src/app/service/financas.service';

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
        Daterangepicker,
        RouterModule.forChild([
            {
                path: '',
                component: FinancasComponent,
                runGuardsAndResolvers: 'always',
                resolve: {
                    financa: FinancasResolverService
                }
            }
        ])
    ],
    providers: [
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'BRL'
        },
        FinancasResolverService,
        FinancasService
    ]
})
export class FinancasModule {  }
