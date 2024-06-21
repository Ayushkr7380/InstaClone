import { model , Schema } from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    name:{
        type:'String',
        required:[true,'Name is required'],
        lowercase : true,
        trim : true,
        minLength:[5,"Name must be atleast 5 characters"],
        maxLength:[30,"Name should be less than 30 characters"]
    },
    email:{
        type:'String',
        required:[true,"Email is required"],
        lowercase:true,
        trim : true,
        unique : true,
    },
    password:{
        type:'String',
        required:[true,"Password is required"],
        minLength:[8,'Password must be atleast 8 characters'],
        select : false

    }

},{
    timestamps:true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    };
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods = {
    generateJWTToken : async function(){
        return await jwt.sign(
            {
                id:this._id,
                email:this.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword : async function(plainPassword){
            return await bcrypt.compare(plainPassword,this.password);
    }
}

const User = model('User',userSchema);

export default User;