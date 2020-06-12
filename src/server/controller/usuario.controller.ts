import { Router, Request, Response } from 'express';
import { create } from '../service/login.service';
import { json } from 'body-parser';

const router = Router();

router.route('/')
    .all(json())
    .post(async (req: Request, res: Response) => {
        try {
            const { email, password } = (req as any).body;

            const { id } = await create(email, password);
            res.status(201).end();
        } catch (error) {
            res.status(400).send({
                message: error.message || 'Erro não especificado'
            });
        }
    });

export const UsuarioController = router;
