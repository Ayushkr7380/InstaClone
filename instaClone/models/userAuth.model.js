import { Schema , model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userSchema = new Schema({
    name:{
        type:String,
        trim:true,
        maxLength:[25,'name should atmost of 25 characters'],
        minLength:[5,'name should atleast of 5 charcters'],
        required:true
    },
    username:{
        type:String,
        trim:true,
        required:[true,'username is required'],
        unique : true,
        minLength:[5,'username should atleast 5 characters'],
        maxLength:[30,'username should not be greater than 30 characters']            
    },
    profile:{
        public_id :{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:[true,'email is required'],
        unique : true,
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:[5,'password should atleast 5 characters'],        
    },
    bio:{
        type:String,
        trim:true,
    }

},{
    timestamps:true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods = {
    generateJWTToken : async function(){
        return await jwt.sign({
            id : this._id,
            username : this.username,
            email : this.email
        },
        process.env.JWT_KEY,
        {
            expiresIn:process.env.JWT_EXPIRY
        })
    },
    comparePassword : async function(plainpassword){
        return await bcrypt.compare(plainpassword,this.password);
    }
}

const User = model('User',userSchema);

export default User;