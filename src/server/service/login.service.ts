import { LoginTable } from '../schema/login.schema';
import { SHA512 } from 'crypto-js';

export async function create(email: string, password: string) {
    if (email && password) {
        const login = await LoginTable.create({
            email: SHA512(email).toString(),
            password: SHA512(password).toString()
        });

        return {
            id: login.get('id'),
            email: login.get('email'),
            password: login.get('password')
        };
    } else {
        throw new Error('Dados inválidos');
    }
}
