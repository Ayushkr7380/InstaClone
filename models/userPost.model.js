import { Schema , model } from 'mongoose';

const userPost = new Schema({
    caption:{
        type:String,
        trim:true
    },
    photo:{
        public_id :{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
    },
    user:{
        required:true,
        type:Schema.Types.ObjectId,
        ref : 'User'
    }, 
    likes :[{
        type:Schema.Types.ObjectId,
        ref:'Like'
    }],
    comments :[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }]


},{
    timestamps:true
});

const Post = model('userPost',userPost);

export default Post;