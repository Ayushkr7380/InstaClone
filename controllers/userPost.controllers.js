import Post from '../models/userPost.model.js';
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import User from '../models/userAuth.model.js';
import Like from '../models/like.model.js';
import Comment from '../models/comment.model.js';

const userPost = async (req,res,next) =>{
    try {
        const { caption , photo } = req.body;
        const userId = req.user.id;
        // if(!caption){
        //     return res.status(400).json({
        //         success:false,
        //         message:'All fields are required!!'
        //     });
        // };
        console.log(photo)
        // if(!photo){
        //     return res.status(400).json({
        //         success:false,
        //         message:'All fields are required!!'
        //     });
        // };
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Photo is required!',
            });
        }
        const post = await Post.create({
            caption:caption,
            user:userId
        });


        console.log(req.file); 
        if (req.file){
            
            try{
                const  result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder:'instaclonepost',
                    width:400,
                    height:400,
                    gravity:'faces',
                    crop:'fill'
                });

                if (result){
                    post.photo = {
                        public_id: result.public_id,
                        secure_url: result.secure_url
                    };


                    //Remove files from local

                    fs.rm(`uploads/${req.file.filename}`)
                }

            }catch(e){
                return res.status(500).json({
                    error:e.message,
                    success:false,
                    message:'Failed to Upload Photo!!'
                });
            }
        }

        if(!post){
            return res.status(400).json({
                success:false,
                message:'Failed to Post!!'
            });
        }

        await post.save();

        res.status(200).json({
            success:true,
            message:'Post Successful',
            post
        });
        
    } catch (e) {
        res.status(500).json({
            success:false,
            message:e.message,
        });
    }
    
    
};

const viewPost = async(req,res,next) =>{
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    const likes = await Like.find();

    const { id } = req.params;
    const post = await Post.findOne({_id:id}).populate('user','username profile');
    // console.log(post[0].user)

    res.status(200).render('viewpost',{user,post,likes});
    
};

const postDelete = async(req,res,next)=>{
    try {
        
        const { id } = req.params;

        const post = await Post.findById({_id:id})

        // Delete the associated image from Cloudinary
        if(!post){
            return res.status(400).json({
                success:false,
                message:'failed to delete the post!!'
            });
        }
        
         // Delete the associated image from Cloudinary if it exists
        if (post.photo && post.photo.public_id) {
        await cloudinary.v2.uploader.destroy(post.photo.public_id);
        console.log('Image deleted from Cloudinary:', post.photo.public_id);
        } else {
        console.log('No public_id found for Cloudinary deletion');
        }

        if (!post.likes || post.likes.length === 0) {
            console.log('No likes found for this post');
                
        }else{
            console.log('Number of likes:', post.likes.length);
            const likeIds = post.likes.map(like => like._id);
            await Like.deleteMany({ _id: { $in: likeIds } });
        }
        
        if(!post.comments || post.comments.length === 0){
            console.log('No comments found for this post')
        }
        else{
            console.log('No. of comments : ',post.comments.length);
            const commentIds = post.comments.map(comment=>comment._id);
            await Comment.deleteMany({_id:{$in:commentIds}});
        }
            
        
        
        await Post.findByIdAndDelete({_id:id});


    
        res.status(200).json({
            success:true,
            message:'Post deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const postEdit = async(req,res,next)=>{
    try{
        const { id } = req.params;

        const { newCaption } = req.body;


        const post = await Post.findById({_id:id});
        if(!post){
            return res.status(400).json({
                success:false,
                message:'Failed to edit the post!!'
            })
        }

        post.caption = newCaption;

        await post.save();

        res.status(200).json({
            success:true,
            message:'Post edited successfully',
            post
        });


    }catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        });
    }
};

const home = async(req,res,next)=>{
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password');;
        const posts = await Post.find().populate('user', 'username profile')
        const likes = await Like.find();
        
        

        res.status(200).render('home',{posts,user,likes})
        // res.status(200).json({
        //     success:true,
        //     message:'Fetched all post successfully',
        //     posts,
        //     likes
        // })
    } catch (e) {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
};

const othersProfile = async(req,res,next) =>{
    try {
        
        const { id } = req.params;
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');;

        const post  = await Post.find({user:id}).populate('user','username profile name bio');
        
        res.status(200).render('otherprofile',{post,user});
        // res.status(200).json({
        //     success:true,
        //     id,
        //     post
        // })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
const likePost = async (req,res,next) =>{
    try {
        
        const userId = req.user.id;
        const {postId} = req.body;

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ user: userId, post: postId });

        if (existingLike) {
            // User has already liked the post, so delete the like (dislike)
            await Like.findByIdAndDelete(existingLike._id);

            // Remove the like from the post's 'likes' array
            await Post.findByIdAndUpdate(postId, {
                $pull: { likes: existingLike._id }
            });

            // // Get updated like count
            // const updatedPost = await Post.findById(postId).populate('user', 'username');
            // const likeCount = updatedPost.likes.length;

            // Respond with success status and updated like count
            return res.status(200).json({
                success: true,
                message: 'Post disliked successfully!',
                
                // likeCount: likeCount
            });
        
        } else {
            // User has not liked the post, create a new like
            const like = await Like.create({
                user: userId,
                post: postId
            });

            if (!like) {
                return res.status(400).json({
                    success: false,
                    message: 'Failed to Like this Post!!'
                });
            }

            // Add the new like to the post's 'likes' array
            await Post.findByIdAndUpdate(postId, {
                $push: { likes: like._id }
            });

            // // Get updated like count
            // const updatedPost = await Post.findById(postId).populate('user', 'username');
            // const likeCount = updatedPost.likes.length;

            // Respond with success status and updated like count
            return res.status(200).json({
                success: true,
                message: 'Post liked successfully!',
                // likeCount: likeCount
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};



const commentPost = async(req,res,next)=>{
    try {
        const userId = req.user.id;
        
        const { text , postid } = req.body;
        console.log(text)
        console.log(postid)

        if(!text){
            return res.status(400).json({
                success:true,
                message:'Write a comment..!!'
            })
        }

        const post = await Post.findById(postid);

        if(!post){
            return res.status(400).json({
                success:false,
                message:'Failed to save comment'
            })
        }

        const comment = await Comment.create({
            user : userId,
            post : postid,
            text : text
        })

        if(!comment){
            return res.status(400).json({
                success:false,
                message:'Failed to comment..!!'
            })
        }

        await comment.save();

        

        post.comments.push(comment)

        await post.save();

        // res.status(200).render('comments')
        res.status(200).json({
            success:true,
            message:'Comment successful',
            comment,
            post
        })


    } catch (e) {
        return res.status(500).json({
            success:false,
            message:e.message
        })   
    }


};
const commentPage =async(req,res,next)=>{
    const userId = req.user.id;
    const postId = req.params.id;

    const user = await User.findById(userId).select('-password');;
    if(!user){
        return res.status(400).json({
            success:false,
            message:'User not found ..!'
        })
    }

    const post = await Post.findById(postId);
    if(!post){
        return res.status(400).json({
            success:false,
            message:'Post not found ..!'
        })
    }

    const comment = await Comment.find({post:postId}).populate('user','username profile');

    res.status(200).render('comments',{user,post,comment})
};
const allLikes =async(req,res,next)=>{
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');;
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User not Found..!!'
            })
        }

        const likes = await Like.find({post:postId}).populate('user','username profile')
        if(!likes){
            return res.status(400).json({
                success:false,
                message:'Like not Found..!!'
            })
        }

        res.status(200).render('likes',{likes,user})
    }catch (e) {
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
    
};
export {
    userPost,
    viewPost,
    postDelete,
    postEdit,
    home,
    othersProfile,
    likePost,
    commentPost,
    commentPage,
    allLikes
}