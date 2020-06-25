import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cadastro-usuario',
    templateUrl: './cadastro-usuario.component.html',
    styleUrls: [ './cadastro-usuario.component.scss' ]
})
export class CadastroUsuarioComponent {
    group: FormGroup;
    message: {
        type: 'success' | 'error',
        message: string
    };

    constructor(
        readonly form: FormBuilder,
        private readonly api: UsuarioService,
        private readonly toastr: ToastrService,
        private readonly login: LoginService,
        private readonly router: Router
    ) {
        this.group = form.group({
            nome: [null, [
                Validators.required
            ]],
            email: [null, [
                Validators.required,
                Validators.email
            ]],
            senha: [null, [
                Validators.required,
                Validators.minLength(8)
            ]]
        });
    }

    enviar($event: Event) {
        $event.preventDefault();

        const { nome, email, senha } = this.group.value;

        this.api.save({ username: nome, email, password: senha })
            .subscribe((token) => {
                this.toastr.success('Usuário criado com sucesso!', 'Criação de usuário');
                this.login.setData(nome, token);
                this.router.navigate(['/']);
            },
            (err) => this.toastr.error(err.message || 'Falha não especificada ao criar usuário', 'Criação de usuário'));
    }
}
