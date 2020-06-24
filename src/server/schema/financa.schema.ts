import { Schema, model } from 'mongoose';

const FinancaSchema = new Schema({
    idUsuario: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: Schema.Types.String,
    },
    valor: {
        type: Schema.Types.Number,
        required: true
    },
    tipo: {
        type: Schema.Types.Number,
        required: true
    },
    status: {
        type: Schema.Types.Number
    },

    lancarEm:  {
        type: Schema.Types.Date
    },
    vencimento: {
        type: Schema.Types.Date
    },
    anexo: {
        type: Schema.Types.ObjectId,
    }
}, {
    collection: 'Financa',
    timestamps: true
});

export const FinancaTable = model('Financa', FinancaSchema);
