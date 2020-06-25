import { Types, mongo } from 'mongoose';
import * as moment from 'moment';
import { FinancaTable } from '../schema/financa.schema';

export async function getFinancas(idUsuario: string, startDate: moment.Moment, endDate: moment.Moment) {
    const start = startDate.toDate();
    const end = endDate.toDate();

    const list = await FinancaTable.find({
        idUsuario,
        $and: [
            {
                $or: [
                    { lancarEm: start },
                    { lancarEm: { $gt: start } },
                    { vencimento: start },
                    { vencimento: { $gt: start } }
                ]
            },
            {
                $or: [
                    { lancarEm: end },
                    { lancarEm: { $lt: end } },
                    { vencimento: end },
                    { vencimento: { $lt: end } }
                ]
            }
        ]
    }).sort([
        ['lancarEm', 1],
        ['vencimento', 1]
    ]);

    if (list.length > 0) {
        const data = list.map((item) => ({
            id: item.get('id'),
            title: item.get('title'),
            valor: item.get('valor'),
            tipo: item.get('tipo'),
            status: item.get('status'),
            vencimento: item.get('vencimento') ? moment(item.get('vencimento')).format('DD/MM/YYYY') : null,
            anexo: item.get('anexo') || null
        }));

        const total = data.reduce((value, item) => {
            if (item.tipo === 0) {
                return value + item.valor;
            } else {
                return value - item.valor;
            }
        }, 0);

        return {
            total,
            financas: data
        };
    } else {
        return null;
    }
}

export async function removeFinanca(idUsuario: string, id: string) {
    await FinancaTable.deleteOne({ _id: Types.ObjectId(id) });
    return true;
}

export async function saveFinanca(obj) {
    const data = await FinancaTable.create(obj);
    return data.get('id');
}

export async function marcarPago(idUsuario, id) {
    const item = await FinancaTable.findById(id);

    console.log(item);

    if (item) {
        if (item.get('status') === 1) {
            const vencimento = item.get('vencimento');
            const status = moment(vencimento).isAfter(moment()) ? 3 : 2;

            await FinancaTable.updateOne({
                _id: id
            }, { status });
        } else {
            await FinancaTable.updateOne({
                _id: id
            }, { status: 1 });
        }
    } else {
        throw new Error('Objeto não encontrado');
    }
}
