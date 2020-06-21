import * as moment from 'moment';

let financasData: any[] = [
    {
        id: '32781738',
        title: 'Salário',
        valor: 4230.00,
        tipo: 0,
        dataDebito: '01/06/2020'
    },
    {
        id: 'djksaljdkasd',
        title: 'Conta de Luz',
        vencimento: '20/06/2020',
        valor: 250.00,
        tipo: 1,
        status: 2,
        anexo: '/api/download/38120983912038'
    },
    {
        id: '8e9023osaide',
        title: 'Conta de Água',
        vencimento: '05/06/2020',
        valor: 100.00,
        tipo: 1,
        status: 1
    },
    {
        id: 'djsalmcdkajdik',
        title: 'Conta de Telefone',
        vencimento: '05/06/2020',
        valor: 180.00,
        tipo: 1,
        status: 0
    },
    {
        id: 'djklsadjklasxj8',
        title: 'Prestação carro',
        vencimento: '20/06/2020',
        valor: 600.00,
        tipo: 1,
        status: 2
    },
];

export async function getFinancas(startDate: moment.Moment, endDate: moment.Moment) {
    const total = financasData.reduce((value, item) => {
        if (item.tipo === 0) {
            return value + item.valor;
        } else {
            return value - item.valor;
        }
    }, 0);

    return {
        total,
        financas: financasData
    };
}

export async function removeFinanca(idFinanca: string) {
    const item = financasData.find(({ id }) => id === idFinanca);

    if (item) {
        financasData = financasData.filter(({ id }) => id !== idFinanca);

        return true;
    } else {
        return false;
    }
}
