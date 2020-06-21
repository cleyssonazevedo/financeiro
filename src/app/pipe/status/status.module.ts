import { NgModule } from '@angular/core';
import { StatusPipe } from './status.pipe';

@NgModule({
    declarations: [ StatusPipe ],
    exports: [ StatusPipe ]
})
export class StatusModule {  }
