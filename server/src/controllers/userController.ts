import { Request, Response } from 'express';
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const secret = 'rjhfhhjjjhuuyyuyriehuubh';


const postRegisteredUser = asyncHandler(async (req: Request, res: Response) => {
    const {fullname, email, username, password} = req.body;

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullname, email, username, password: hashPassword
    });
    res.json(user);
});

// Handler function to handle user login
const postLoginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find user by username or email
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        
        // If user not found, return error
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Compare provided password with stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords match, generate JWT and set cookie
        if (passwordMatch) {
            jwt.sign({ username, id: user.id }, secret, {}, (err: any, token: string) => {
                if (err) {
                    throw err;
                }
                res.cookie('token', token).json('OK');
            });
        } else {
            // If passwords don't match, return error
            res.status(400).json({ error: "Wrong credentials" });
        }
    } catch (error) {
        console.error("Error occurred during login:", error);
        res.status(500).json({ error: "An error occurred during login" });
    }
});

// This checks if the user is logged in
const checkProfile = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err: Error, infos: any) => {
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