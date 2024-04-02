import express, {Response, Request} from 'express';
const asyncHandler = require('express-async-handler');
const {
    getComments, postComment, putComment, deleteComment
} = require('../models/commentsModel');



const router = express.Router();


router.route('/')
.post(postComment)
.get(getComments);

router.route('/:id')
.put(putComment)
.delete(deleteComment);


module.exports = router;