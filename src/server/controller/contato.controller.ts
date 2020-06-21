import { Router } from 'express';
import { json } from 'body-parser';
import { Save } from '../service/contato.service';

const router = Router();
router.use(json());

router.route('/')
    .post(async (req, res) => {
        try {
            await Save(req.body);
            res.send();
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Erro não especificado'
            });
        }
    });

export const ContatoController = router;
