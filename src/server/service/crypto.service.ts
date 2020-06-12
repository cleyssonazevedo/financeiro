import { sign, verify, SignOptions } from 'jsonwebtoken';
import { Login } from '../model/login.model';

const { SECRET_KEY } = process.env;
const options: SignOptions = {
    algorithm: 'HS512',
    expiresIn: '3h'
};

export function gerarJWT(obj: Login) {
    return sign({
        id: obj.id || 0
    }, SECRET_KEY as string, options);
}

export function validarToken(token: string) {
    return verify(token, SECRET_KEY as string, options);
}
