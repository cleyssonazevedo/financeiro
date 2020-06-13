import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderItemComponent } from './header-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [ HeaderItemComponent ],
    exports: [ HeaderItemComponent ]
})
export class HeaderItemModule {  }
