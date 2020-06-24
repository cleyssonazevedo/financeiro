import { Schema, model } from 'mongoose';

const AnexoSchema = new Schema({
    idUsuario: {
        type: Schema.Types.ObjectId,
        required: true
    },
    nome: {
        type: Schema.Types.String,
        required: true
    },
    anexo: {
        type: Schema.Types.Buffer,
        required: true
    }
}, {
    collection: 'Anexo',
    timestamps: true
});

export const AnexoTable = model('Anexo', AnexoSchema);
