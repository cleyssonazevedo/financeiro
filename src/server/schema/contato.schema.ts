import { Schema, model } from 'mongoose';

const ContatoSchema = new Schema({
    nome: String,
    email: String,
    assunto: {
        type: String,
        required: true
    },
    mensagem: {
        type: String,
        required: true
    }
}, { timestamps: true, collection: 'Contato' });

export const ContatoTable = model('Contato', ContatoSchema);
