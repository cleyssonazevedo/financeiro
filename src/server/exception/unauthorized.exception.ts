
export class UnauthorizedException extends Error {
    constructor() {
        super('Usuário ou senha incorretos');
    }
}
