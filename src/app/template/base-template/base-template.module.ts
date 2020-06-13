import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/components/header/header.module';
import { BaseTemplateComponent } from './base-template.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HeaderModule
    ],
    declarations: [ BaseTemplateComponent ],
    exports: [ BaseTemplateComponent ]
})
export class BaseTemplateModule {  }
