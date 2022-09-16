const dotenv = require('dotenv').config()

const DAO = process.env.DAO

const conexion = async () => {

    switch (DAO) {
        case 'mongoDB':
            const mongoose = require('mongoose')
            const connectMongoDB = async () =>{
                try {
                    const url = process.env.MONGODB_ATLAS
                    mongoose.connect(url, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    })
                    console.log('MongoDB connected');
            
                } catch (error) {
                    console.log(error);
                }
            }
            connectMongoDB()
            break;

        case 'firebase':
            const admin = require("firebase-admin");
            const connectFirebase = async () =>{
                try {
                    const serviceAccount = require("./backend-ecommerce-ba4b0-firebase-adminsdk-48kr9-2abb6a865b.json");
                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount)
                    });
                    console.log('Firebase connected');
    
                } catch (error) {
                    console.log(error);
                }
            }
            connectFirebase()

            break;
    
        default:
            break;
    }


}

module.exports = conexion
