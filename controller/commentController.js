const mongoose = require('mongoose');
const Comment = require('../model/commentModel');
const Post = require('../model/postModel');


exports.createComment = async(req, res) =>{
    try {
        
        //fetch data from req body
        const {post , user , body } = req.body;

        //create a comment object
        const comment = new Comment({
            post, user, body
        });

        // save the new comments into database
        const savedComment = await comment.save();

        const updatePost = await Post.findByIdAndUpdate(post, {$push:{comments : savedComment._id}}, {new:true} )
                .populate("comments").exec();

        
        res.status(200).json({
            post:updatePost,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : "Error while creating comments",
            message : error.message
        });
    }
}