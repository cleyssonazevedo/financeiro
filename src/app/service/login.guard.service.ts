import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuardService implements CanActivate {
    constructor(
        private readonly service: LoginService
    ) {  }

    canActivate() {
        console.log('Can Activated');
        console.log('Token', this.service.token);
        return this.service.token !== null;
    }
}
