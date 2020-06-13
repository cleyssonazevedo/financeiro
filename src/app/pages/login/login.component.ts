import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    invalid = false;
    invalidHttp = false;
    login: FormGroup;

    constructor(
        readonly builder: FormBuilder,
        private readonly service: LoginService,
        private readonly router: Router
    ) {
        this.login = builder.group({
            username: builder.control(null, [
                Validators.required,
                Validators.email
            ]),
            password: builder.control(null, [
                Validators.required
            ])
        });
    }

    enviar() {
        if (this.login.valid) {
            const { username, password } = this.login.value;
            const data = new Login(username, password);

            this.service.logIn(data)
                .subscribe(
                    () => {
                        console.log('Logged');
                        this.router.navigate(['/']);
                    },
                    (err) => console.error(err));

        } else {
            this.invalid = true;
        }
    }
}
