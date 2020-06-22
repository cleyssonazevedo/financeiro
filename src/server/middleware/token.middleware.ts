import { Request, Response, NextFunction } from 'express';
import { validarToken, gerarJWT } from '../service/crypto.service';

export async function TokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.get('Authorization');

    if (token) {
        if (/^Bearer */.test(token)) {
            const auth = /^Bearer (.*)/.exec(token)[1];

            try {
                const data = await validarToken(auth);
                res.locals.login = data;

                const newToken = gerarJWT({
                    id: data.id,
                    email: data.email,
                    username: data.username
                });

                res.set('Authorization', `Bearer ${newToken}`);
                next();
            } catch (error) {
                console.log(error);
                res.status(403).send({ message: 'Token expirado' });
            }
        } else {
            res.status(403).send({ message: 'Token inválido' });
        }
    } else {
        res.status(511).send({ message: 'Token requerido!' });
    }
}
