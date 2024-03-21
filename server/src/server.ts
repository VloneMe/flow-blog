import express, { Express } from 'express';
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const DBconnection = require('./config/DBconnection');

DBconnection();
const server: Express = express();
const port = 5000 || 3000;
const clientPort = 5173

server.use(cors({
    credentials: true, 
    origin: `http://localhost:${clientPort}`
}));
server.use(express.json());
server.use(cookieParser());
server.use('/api/', require('./routes/userRoute'));


server.listen(port, () => {
    console.log(`[server]: Running at http://localhost:${port}`)
});