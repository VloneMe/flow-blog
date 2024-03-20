import express, {Express, Request, Response} from 'express';
const dotenv = require('dotenv');

dotenv.config();
const server: Express = express();

server.use(express.json());
server.get('/', (req: Request, res: Response) => {
    res.send("Hello World!");
});


server.listen(5000, () => {
    console.log(`[server]: Running at http://localhost:5000`)
});