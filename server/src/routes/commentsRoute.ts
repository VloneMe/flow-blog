import express, {Response, Request} from 'express';
const {
    getComments, postComment, putComment, deleteComment
} = require('../controllers/commentsController');



const router = express.Router();


router.route('/:id')
.post(postComment)
.get(getComments)

router.route('/:id')
.put(putComment)
.delete(deleteComment)


module.exports = router;