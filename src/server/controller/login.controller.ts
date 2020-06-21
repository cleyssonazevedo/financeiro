import { Router } from 'express';
import { gerarJWT } from '../service/crypto.service';
import { json } from 'body-parser';
import { getUsuario } from '../service/usuario.service';
import { UnauthorizedException } from '../exception/unauthorized.exception';

const router = Router();
router.use(json());

router.route('/')
    .post(async (req, res) => {
        try {
            const { username, password } = req.body;

            if (username && password) {
                try {
                    const item = await getUsuario(username, password);

                    // Checar no banco de dados
                    const bearer = gerarJWT({
                        id: item.id,
                        email: item.email,
                        username: item.username
                    });

                    res.set('Authorization', `Bearer ${bearer}`);
                    res.send({
                        username: item.username
                    });
                } catch (e) {
                    if (e instanceof UnauthorizedException) {
                        res.status(401).send({ message: e.message });
                    } else {
                        res.status(500).send({ message: e.message || 'Falha não especificada' });
                    }
                }
            } else {
                throw new Error('Usuário ou senha vazios');
            }
        } catch (error) {
            console.error(error);
            res.status(400).send({
                message: 'Dados inválidos'
            });
        }
    });


export const LoginController = router;
