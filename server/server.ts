import express, { Express } from 'express';
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const DBconnection = require('./src/config/DBconnection');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Establish database connection
DBconnection();

// Create Express server
const server: Express = express();
const port = process.env.PORT || 3000; 
const clientPort = 5173;

// Middleware
server.use(cors({
    credentials: true,
    origin: `http://localhost:${clientPort}`
}));
server.use(express.json());
server.use(cookieParser());

// Serve uploaded files statically
server.use('/uploads', express.static(__dirname + '/uploads'));

// Routes
server.use('/api/', require('./src/routes/userRoute'));
server.use(
    '/api/blogposts/',
    upload.single('file'),
    require('./src/routes/blogpostRoute'
));
server.use('/api/comments/', require('./src/routes/commentsRoute'));

// Start server
server.listen(port, () => {
    console.log(`[server]: Running at http://localhost:${port}`);
});