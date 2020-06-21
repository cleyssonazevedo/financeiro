import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    isSended = false;
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
        this.isSended = true;

        if (this.login.valid) {
            const { username, password } = this.login.value;
            const data = new Login(username, password);

            this.service.logIn(data)
                .subscribe(
                    () => this.router.navigate(['/']),
                    (err) => {
                        console.error(err);
                        this.login.get('password').setValue(null);

                        if (err instanceof HttpErrorResponse) {
                            this.toastr.error(err.error.message || 'Falha ao logar, tente novamente mais tarde', 'Falha', {
                                closeButton: true
                            });
                            this.isSended = false;
                        } else {
                            this.toastr.error(err.message || 'Falha ao logar, tente novamente mais tarde', 'Falha', {
                                closeButton: true
                            });
                            this.isSended = false;
                        }
                    });

        } else {
            this.invalid = true;
            this.isSended = false;
        }
    }
}
