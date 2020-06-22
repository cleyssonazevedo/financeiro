import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseTemplateModule } from './template/base-template/base-template.module';
import { LoginService } from './service/login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginGuardService } from './service/login.guard.service';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { HttpInterceptorService } from './service/http-interceptor.service';

registerLocaleData(localePt, 'pt', localePtExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    BaseTemplateModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    LoginService,
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
