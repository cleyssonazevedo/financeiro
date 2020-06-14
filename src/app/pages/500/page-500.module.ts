import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Page500Component } from './page-500.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Page500Component
            }
        ])
    ],
    declarations: [ Page500Component ]
})
export class Page500Module {  }
