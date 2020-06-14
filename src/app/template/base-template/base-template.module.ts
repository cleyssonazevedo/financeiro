import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/components/header/header.module';
import { BaseTemplateComponent } from './base-template.component';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HeaderModule,
        FooterModule
    ],
    declarations: [ BaseTemplateComponent ],
    exports: [ BaseTemplateComponent ]
})
export class BaseTemplateModule {  }
