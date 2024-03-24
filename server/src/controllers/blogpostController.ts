import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler');
const BlogPosts = require('../models/blogpostModel')

const postBlog = asyncHandler(async (req: Request, res: Response) => {
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const exten = parts[parts.length - 1];
        const newPath = path + '.' + exten;
        res.json({ files: req.file });

        const {title, summary, content} = req.body;
        const blogposts = await BlogPosts.create({
            title, summary, content,
            cover: newPath
        })

        res.json(blogposts)

        res.json({title, summary, content})
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

const getBlogPosts = asyncHandler(async (requestAnimationFrame:Request, res: Response) => {
    res.json(await BlogPosts.find());
})

module.exports = {
    postBlog, getBlogPosts
}
