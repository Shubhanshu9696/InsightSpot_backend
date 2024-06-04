const mongoose = require('mongoose');
const Post = require('../model/postModel');
const Like = require('../model/likeModel');


exports.createPost = async(req , res) => {
    try {
        const {title, body} = req.body;

        const post = new Post ({
            title, body
        })

        const savedPost = await post.save();

        res.status(200).json({
            post : savedPost,
        })

    } catch (error) {
        console.log('error occur while creating post');
        res.status(400).json({
            message : error.message,
        })
    }
}


exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate("comments") .populate("like").exec();

        res.status(200).json({
            posts,
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error : "Error while creating comments",
            message : error.message
        });
    }
}