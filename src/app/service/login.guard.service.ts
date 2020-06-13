import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuardService implements CanActivate {
    canActivate() {
        return false;
    }
}
