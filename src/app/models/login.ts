import { SHA512 } from 'crypto-js';

export class Login {
    public username: string;
    public password: string;

    constructor(
        username: string,
        password: string
    ) {
        this.username = username;
        this.password = SHA512(password).toString();
    }
}
