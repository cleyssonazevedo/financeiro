import { Schema, model } from 'mongoose';

const LoginSchema = new Schema({
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
    collection: 'Login'
});

export const LoginTable = model('Login', LoginSchema);
