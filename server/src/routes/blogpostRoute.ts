import express from 'express';
const {
    postBlog, getBlogPosts, getBlogPostByID
} = require('../controllers/blogpostController')


const router = express.Router();

router.route("/")
.post(postBlog)
.get(getBlogPosts);

router.route('/:id')
.get(getBlogPostByID)
.put(getBlogPostByID);


module.exports = router;