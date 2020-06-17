import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LoginService {
    private isBrowser: boolean;
    public username: string;
    public token: string;

    constructor(
        private readonly http: HttpClient,
        @Inject(PLATFORM_ID) readonly platformId: string
    ) {
        this.isBrowser = isPlatformBrowser(platformId);

        if (this.isBrowser) {
            this.getData();
        }
    }

    setData(username: string, token: string) {
        localStorage.setItem('u', username);
        localStorage.setItem('t', token);

        this.username = username;
        this.token = token;
    }

    getData() {
        this.username = localStorage.getItem('u');
        this.token = localStorage.getItem('t');
    }


    clearData() {
        localStorage.removeItem('u');
        localStorage.removeItem('t');

        this.username = null;
        this.token = null;
    }

    logIn(login: Login) {
        return this.http.post('/api/login', login, { observe: 'response' })
            .pipe(
                map((response) => {
                    switch (response.status) {
                        case 200:
                            // Talvez mude
                            this.username = 'Teste';
                            const auth = response.headers.get('authorization');

                            this.setData('Teste', auth);
                            return true;

                        case 401:
                            throw new Error('Usuário ou senha incorretos');

                        default:
                            console.error(response.body);
                            throw new Error('Falha ao executar a requisição');
                    }
                })
            );
    }

    logoff() {
        this.clearData();
    }
}
