require('dotenv/config')
const mongoose = require('mongoose')

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const cluster = process.env.MONGO_URL;
const db = process.env.MONGO_DB;


const connect = async () => {
    mongoose.connect("mongodb://" + cluster + "/" + db, {
        pass,
        user,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = connect;