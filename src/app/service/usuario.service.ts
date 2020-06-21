import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SHA512 } from 'crypto-js';
import { map } from 'rxjs/operators';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly http: HttpClient
    ) {  }

    save(usuario: { username: string, email: string, password: string }) {
        usuario.password = SHA512(usuario.password).toString();
        return this.http.post('/api/usuario', usuario, { observe: 'response' })
            .pipe(map((response) => {
                if (response.status === 201) {
                    return response.headers.get('Authorization');
                } else {
                    throw new Error('Falha ao tentar criar usuário');
                }
            }));
    }
}
