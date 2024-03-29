import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');
const BlogPosts = require('../models/blogpostModel');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const secret = 'rjhfhhjjjhuuyyuyriehuubh';

const postBlog = asyncHandler(async (req: Request, res: Response) => {
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const exten = parts[parts.length - 1];
        const newPath = path + '.' + exten;
        fs.renameSync(path, newPath);

        const { token } = req.cookies;
        jwt.verify(token, secret, {}, async (err: any, infos: any) => {
            if (err) {
                throw err;
            }
            const { title, summary, content } = req.body;
            const blogpost = await BlogPosts.create({
                title,
                summary,
                content,
                cover: newPath,
                author: infos.id
            });
            res.json(blogpost);
        });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

const putBlog = asyncHandler(async (req: Request, res: Response) => {
    let newPath: string | null = null;
    if (req.file){
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const exten = parts[parts.length - 1];
        newPath = path + '.' + exten;
        fs.renameSync(path, newPath);

        const { token } = req.cookies;
        jwt.verify(token, secret, {}, async (err: Error, infos: any) => {
            
            if (err) throw err;
            const {id, title, summary, content } = req.body;

            const putData = await BlogPosts.findById(id);
            const isAuthor = JSON.stringify(putData.author) === JSON.stringify(infos.id);

            if (!isAuthor){
                return res.status(400).json('You ar Not author.')
            }

            await putData.update({
                title, summary, content,
                cover: newPath ? newPath : putData.cover
            });

            res.json({isAuthor});
        });
    }
});

const getBlogPosts = asyncHandler(async (req: Request, res: Response) => {
    const blogPosts = await BlogPosts.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20);

    res.json(blogPosts);
});

const getBlogPostByID = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;
    const postBlog = await BlogPosts.findById(id)
    .populate('author', ['username'])
    res.json(postBlog);
});

export {
    postBlog,
    getBlogPosts,
    getBlogPostByID
};
