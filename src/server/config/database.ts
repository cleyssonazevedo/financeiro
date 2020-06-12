import * as mongoose from 'mongoose';
const { MONGO_URL, MONGO_DATABASE, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI || `${MONGO_URL}/${MONGO_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('we\'re connected!'));
