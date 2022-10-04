const optionsMySQL = {
    client: 'mysql',
    connection: {
        host: 'localhost',  //127.0.0.1
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
}

const optionsSQLite3 = {
    client:'sqlite3',
    connection: {
        filename: './databases/ecommerce.sqlite',
    },
    useNullAsDefault: true
}
//Conection Mongo Atlas
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST} = process.env
const connectMongoDB = async () =>{
    try {
        const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected');

    } catch (error) {
        console.log(error);
    }
}

module.exports = { optionsMySQL, optionsSQLite3, connectMongoDB }
