
export class DuplicateException extends Error {
    constructor() {
        super('Usuário já cadastrado');
    }
}
