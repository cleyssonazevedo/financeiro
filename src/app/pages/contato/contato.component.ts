import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContatoService } from 'src/app/service/contato.service';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
    styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
    group: FormGroup;
    message: {
        type: 'success' | 'error',
        message: string
    };

    constructor(
        private readonly api: ContatoService
    ) {
        this.group = new FormGroup({
            nome: new FormControl(null),
            email: new FormControl(null),
            assunto: new FormControl(null, Validators.required),
            mensagem: new FormControl(null, Validators.required)
        });
    }

    enviar($event: Event) {
        $event.preventDefault();

        this.api.save(this.group.value)
            .subscribe(
                () => {
                    this.message = {
                        type: 'success',
                        message: 'Dados salvos'
                    };
                    this.group.disable();
                },
                () => {
                    this.message = {
                        type: 'error',
                        message: 'Falha ao salvar dados, tente novamente mais tarde.'
                    };
                });
    }
}
