import { connection } from "mongoose";
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');


const DBconnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_STRING);
        console.log("[server]: Database Succesfully Connected!")
        connect.connection.host;
        connect.connection.name;
    } catch (err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = DBconnection;