import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContatoService {
    constructor(
        private readonly http: HttpClient
    ) {  }

    save(contato: { nome?: string, email?: string, assunto: string, mensagem: string }) {
        return this.http.post('/api/contato', contato);
    }
}
