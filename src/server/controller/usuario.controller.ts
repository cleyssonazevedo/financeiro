import { Router, Request, Response } from 'express';
import { create } from '../service/usuario.service';
import { json } from 'body-parser';
import { DuplicateException } from '../exception/duplicate.exception';
import { gerarJWT } from '../service/crypto.service';

const router = Router();
router.use(json());

router.route('/')
    .post(async (req: Request, res: Response) => {
        try {
            const { username, email, password } = (req as any).body;

            try {
                const data = await create(username, email, password);
                const token = gerarJWT({
                    id: data.id,
                    email: data.email,
                    username
                });

                res.set('Authorization', token);
                res.status(201).end();
            } catch (e) {
                if (encodeURI instanceof DuplicateException) {
                    res.status(409).send();
                } else {
                    res.status(500).send({
                        message: e.message || 'Erro não especificado'
                    });
                }
            }
        } catch (error) {
            res.status(400).send({
                message: error.message || 'Erro não especificado'
            });
        }
    });

export const UsuarioController = router;
