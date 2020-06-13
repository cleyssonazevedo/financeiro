import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { HeaderItemModule } from '../header-item/header-item.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HeaderItemModule
    ],
    declarations: [ HeaderComponent ],
    exports: [ HeaderComponent ]
})
export class HeaderModule {  }
