import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuardService implements CanActivate {
    constructor(
        private readonly service: LoginService
    ) {  }

    canActivate() {
        return this.service.token !== null;
    }
}
