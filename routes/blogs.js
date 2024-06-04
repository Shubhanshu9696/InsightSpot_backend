const express = require('express');

const router = express.Router();

const { likePost, unlikePost} = require ('../controller/LikeController');
const { createComment } = require('../controller/commentController');
const { createPost , getAllPost } = require('../controller/postController');



router.post('/comments/create', createComment);

router.post('/post/create' , createPost);

router.get('/post', getAllPost);

router.post('/likes/like',likePost);

router.post('/likes/unlike', unlikePost);

module.exports = router;

