import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    collapse = false;
    username: string;

    constructor(
        readonly service: LoginService
    ) {
        this.username = service.username;
    }

    logoff() {
        this.service.logoff();
        this.update();
    }

    update() {
        this.username = this.service.username;
    }
}
