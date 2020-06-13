import * as crypto from 'crypto-js';

export class Login {
    public username: string;
    public password: string;

    constructor(
        username: string,
        password: string
    ) {
        this.username = username;
        this.password = crypto.SHA512(password).toString();
    }
}
