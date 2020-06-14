import { connect, connection } from 'mongoose';
const { MONGO_URL, MONGO_DATABASE, MONGODB_URI } = process.env;

connect(MONGODB_URI || `${MONGO_URL}/${MONGO_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => console.log('we\'re connected!'));
