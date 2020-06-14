import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
        private readonly router: Router,
        private readonly toastr: ToastrService
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
                    (err) =>
                        this.toastr.error(err.message || 'Falha ao logar, tente novamente mais tarde', 'Falha', {
                            closeButton: true
                        })
                    );

        } else {
            this.invalid = true;
        }
    }
}
