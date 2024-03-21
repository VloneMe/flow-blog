import { Request, Response } from 'express';
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const secret = 'rjhfhhjjjhuuyyuyriehuubh';


const postRegisteredUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password} = req.body;

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({username, password: hashPassword});
    res.json(user);
});

const postLoginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password} = req.body;

    // hash password

    const user = await User.findOne({username});
    const passoK = await bcrypt.compare(password, user.password);

    if (passoK){
        // User llogged in
        jwt.sign({username, id: user.id}, secret, {}, (err:object, token:string) => {
            if (err) throw err;
            res.cookie('token', token).json('OK');
        })
    } else {
        res.status(400).json({"error": "Wrong creadatials, Get lost!"})
    }
});

// This checks if the user is logged in
const checkProfile = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err: object, infos: object) => {
        if (err) throw err;
        res.json(infos);
    })
});

// Logout user
const postLogout = asyncHandler(async (req: Request, res: Response) => {
    res.cookie('token', '').json('OK');
});

module.exports = {
    postRegisteredUser, postLoginUser, checkProfile, postLogout
}