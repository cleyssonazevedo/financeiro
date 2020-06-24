import { Router } from 'express';
import { json } from 'body-parser';
import * as moment from 'moment';
import { getFinancas, removeFinanca, saveFinanca, marcarPago } from '../service/financas.service';
import { TokenMiddleware } from '../middleware/token.middleware';
import * as fileUpload from 'express-fileupload';
import { save, getData } from '../service/file.service';
import { Types } from 'mongoose';

const router = Router();
router.use(json());
router.use(TokenMiddleware);

router.route('/')
    .get(async (req, res) => {
        const idUsuario = res.locals.login.id;
        const start = req.query.startDate as string;
        const end = req.query.endDate as string;

        if (start && end) {
            const startDate = moment(start, 'DD-MM-YYYY');
            const endDate = moment(end, 'DD-MM-YYYY');

            if (startDate.isValid() && endDate.isValid() && !startDate.isSameOrAfter(endDate)) {
                const financas = await getFinancas(idUsuario, startDate, endDate);
                res.send(financas);
            } else {
                res.status(400).send({ message: 'Datas inválidas' });
            }
        } else {
            res.status(400).send({ message: 'Data não encontrada' });
        }

    })
    .post(async (req, res) => {
        const idUsuario = res.locals.login.id;
        const data = req.body;

        if (data.tipo === 0) {
            try {
                const obj = {
                    idUsuario,
                    title: data.title,
                    tipo: data.tipo,
                    valor: data.valor,
                    lancarEm: moment(data.lancarEm, 'DD/MM/YYYY').toDate()
                };

                await saveFinanca(obj);
                res.send();
            } catch (error) {
                res.status(500).send({
                    message: error.message || 'Erro não especificado'
                });
            }
        } else {
            if (data.anexo) {
                try {
                    const obj = {
                        idUsuario,
                        title: data.title,
                        tipo: data.tipo,
                        valor: data.valor,
                        vencimento: moment(data.vencimento, 'DD/MM/YYYY').toDate(),
                        anexo: Types.ObjectId(data.anexo),
                        status: moment(data.vencimento, 'DD/MM/YYYY').isAfter(moment()) ? 3 : 2
                    };

                    await saveFinanca(obj);
                    res.send();
                } catch (error) {
                    res.status(500).send({
                        message: error.message || 'Erro não especificado'
                    });
                }
            } else {
                try {
                    const obj = {
                        idUsuario,
                        title: data.title,
                        tipo: data.tipo,
                        valor: data.valor,
                        vencimento: moment(data.vencimento, 'DD/MM/YYYY').toDate(),
                        status: moment(data.vencimento, 'DD/MM/YYYY').isAfter(moment()) ? 3 : 2
                    };

                    await saveFinanca(obj);
                    res.send();
                } catch (error) {
                    res.status(500).send({
                        message: error.message || 'Erro não especificado'
                    });
                }
            }
        }
    });

router.route('/:id')
    .delete(async (req, res) => {
        const idUsuario = res.locals.login.id;
        const id = req.params.id;

        console.log('IdUsuario', idUsuario);
        console.log('ID', id);

        if (removeFinanca(idUsuario, id)) {
            res.send();
        } else {
            res.status(404).send();
        }
    });

router.route('/upload')
    .all(fileUpload({
        limits: {
            fileSize: 5 * 1024 * 1024 * 1024 // 5MB max file(s) size
        }
    }))
    .post(async (req, res) => {
        if (req.files) {
            const anexo = req.files.anexo as fileUpload.UploadedFile;
            const id = await save(res.locals.login.id, anexo.data, anexo.name);

            res.send({ id });
        } else {
            res.status(400).send();
        }
    });

router.route('/download/:id')
    .get(async (req, res) => {
        const id = req.params.id;
        const idUsuario = res.locals.login.id;

        console.log('IDUsuario', idUsuario);

        const data = await getData(id, idUsuario);

        res.set('Content-type', 'application/octet-stream');
        res.set('Content-Disposition', `attachment; filename=${data.nome}`);
        res.send(data.anexo);
    });


router.route('/pago/:id')
    .post(async (req, res) => {
        try {
            const id = req.params.id;
            const idUsuario = res.locals.login.id;

            await marcarPago(idUsuario, id);
            res.send();
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Falha' });
        }
    });

export const FinancasController = router;
