import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Page404Component } from './page-404.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Page404Component
            }
        ])
    ],
    declarations: [ Page404Component ]
})
export class Page404Module {  }
