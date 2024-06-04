// const mongoose = require('mongoose');
const Like = require('../model/likeModel');
const Post = require('../model/postModel');


exports.likePost = async ( req, res) =>{
    try {
        const {post, user} = req.body;

        const like = new Like({
            post, user
        })

        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post, {$push : {like : savedLike._id}}, {new : true}).populate("like").exec();

        res.status(200).json({
            like : updatedPost,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : "Error while creating like",
            message : error.message
        });
    }
}


// exports.unlikePost  = async(req, res)=>{

//     try {
//         const {post , like } = req.body;

//         const deletedLike  = await Post.findOneAndDelete({ post:post , _id:like });

//         if (!deletedLike) {
//             return res.status(404).json({
//                 error: "Like not found",
//             });
//         }

//         const updatedPost = await Post.findByIdAndDelete(post, {$pull :{like:deletedLike._id}},{new : true})

//         res.status(200).json({
//             post : updatedPost,
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(404).json({
//             error : "Erron while unliking post", 
//             message : error.message
//         })
//     }
// }



exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        // Find and delete the like
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

        if (!deletedLike) {
            return res.status(404).json({
                error: "Like not found",
            });
        }

        // Update the post to remove the like
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $pull: { like: deletedLike._id } },
            { new: true }
        ).populate("like").exec();

        res.status(200).json({
            post: updatedPost,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error while unliking post",
            message: error.message
        });
    }
}