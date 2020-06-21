import { UsuarioTable } from '../schema/usuario.schema';
import { SHA512 } from 'crypto-js';
import { DuplicateException } from '../exception/duplicate.exception';
import { UnauthorizedException } from '../exception/unauthorized.exception';

export async function create(username: string, email: string, password: string) {
    if (username && email && password) {
        const item = await UsuarioTable.findOne({ email });

        if (!item) {
            const login = await UsuarioTable.create({
                username,
                email: SHA512(email).toString(),
                password: SHA512(password).toString()
            });

            return {
                id: login.get('id'),
                email: login.get('email'),
                password: login.get('password')
            };
        } else {
            throw new DuplicateException();
        }
    } else {
        throw new Error('Dados inválidos');
    }
}

export async function getUsuario(email: string, password: string) {
    email = SHA512(email).toString();
    password = SHA512(password).toString();

    const document = await UsuarioTable.findOne({ email, password }, { password: 0 });

    if (document) {
        return {
            id: document.get('id'),
            email: document.get('email'),
            username: document.get('username')
        };
    } else {
        throw new UnauthorizedException();
    }
}
