import { Router } from 'express';
import { json } from 'body-parser';
import * as moment from 'moment';
import { getFinancas, removeFinanca } from '../service/financas.service';

const router = Router();
router.use(json());

router.route('/')
    .get(async (req, res) => {
        const start = req.query.startDate as string;
        const end = req.query.endDate as string;

        console.log('start', start);
        console.log('end', end);

        if (start && end) {
            const startDate = moment(start, 'DD-MM-YYYY');
            const endDate = moment(end, 'DD-MM-YYYY');

            if (startDate.isValid() && endDate.isValid() && !startDate.isSameOrAfter(endDate)) {
                const financas = await getFinancas(startDate, endDate);
                res.send(financas);
            } else {
                res.status(400).send({ message: 'Datas inválidas' });
            }
        } else {
            res.status(400).send({ message: 'Data não encontrada' });
        }

    });

router.route('/:id')
    .delete(async (req, res) => {
        const id = req.params.id;

        if (removeFinanca(id)) {
            res.send();
        } else {
            res.status(404).send();
        }
    });

export const FinancasController = router;
