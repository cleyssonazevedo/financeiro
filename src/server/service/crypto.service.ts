import { sign, verify, SignOptions } from 'jsonwebtoken';

const { SECRET_KEY } = process.env;
const options: SignOptions = {
    algorithm: 'HS512',
    expiresIn: '3h'
};

export function gerarJWT(obj: { id: string, email: string, username: string }) {
    return sign({
        id: obj.id,
        email: obj.email,
        username: obj.username
    }, SECRET_KEY as string, options);
}

export function validarToken(token: string) {
    return verify(token, SECRET_KEY as string, options) as { id: string, email: string, username: string };
}
