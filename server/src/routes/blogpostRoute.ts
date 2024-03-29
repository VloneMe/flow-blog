import express from 'express';
const {
    postBlog, getBlogPosts, 
    getBlogPostByID, deleteBlogPostByID, 
    putBlog
} = require('../controllers/blogpostController')


const router = express.Router();

router.route("/")
.post(postBlog)
.get(getBlogPosts);

router.route('/:id')
.get(getBlogPostByID)
.put(putBlog)
.delete(deleteBlogPostByID);


module.exports = router;