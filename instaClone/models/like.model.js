import { Schema , model  } from "mongoose";

const likeSchema  = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required: true
    }
},{
    timestamps:true
});
const Like = model('like',likeSchema);

export default Like;