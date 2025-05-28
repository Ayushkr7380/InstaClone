import { Schema , model } from 'mongoose';

const commentSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required: true
    },
    text:{
        type:String,
        trim:true,
        required:true
    }
 
},{
    timestamps:true
});

const Comment = model('comment',commentSchema)

export default Comment;