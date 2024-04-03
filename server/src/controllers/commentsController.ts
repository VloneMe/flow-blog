import express, {Response, Request} from 'express';
const asyncHandler = require('express-async-handler');
const Comments = require('../models/commentsModel');


const postComment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {content, author, postId} = req.body
        const comment = await Comments.create({
            content, author, post: postId
        });
        res.status(201).json(comment);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

const getComments = asyncHandler(async (req: Request, res: Response) => {
    try {
        const comments = await Comments.find();
        res.json(comments);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

const putComment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const comment = await Comments.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(comment);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    try {
        await Comments.findByIdAndDelete(req.params.id);
        res.json({ message: 'Comment deleted successfully' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = {
    postComment, getComments, putComment, deleteComment
}