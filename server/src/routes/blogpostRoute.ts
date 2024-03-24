import express from 'express';
const {
    postBlog, getBlogPosts
} = require('../controllers/blogpostController')


const router = express.Router();

router.route("/")
.post(postBlog)
.get(getBlogPosts);


module.exports = router;