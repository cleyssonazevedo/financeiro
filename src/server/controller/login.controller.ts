import { Router, Request, Response } from 'express';
import { gerarJWT } from '../service/crypto.service';
import { Login } from '../model/login.model';
import { json } from 'body-parser';

const router = Router();

router.route('/')
    .all(json())
    .post((req: Request, res: Response) => {
        try {
            const { username, password } = (req as any).body;

            console.log(username, password);

            if (username && password) {
                // Checar no banco de dados
                const bearer = gerarJWT(new Login(username, password));
                res.set('Authorization', `Bearer ${bearer}`);
                res.end();
            } else {
                throw new Error('Username or password is empty');
            }
        } catch (error) {
            console.error(error);
            res.status(400).send({
                message: 'Dados inválidos'
            });
        }
    });


export const LoginController = router;
