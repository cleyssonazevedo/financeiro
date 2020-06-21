import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: 'Usuario',
    timestamps: true
});

export const UsuarioTable = model('Usuario', UsuarioSchema);
