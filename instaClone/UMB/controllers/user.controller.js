import User from "../models/user.model.js";

const cookieOptions = {
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
    secure : true
}


const register = async (req,res,next) =>{
    try{

        const { name , email , password } = req.body;
    
        if (!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:'All fields are required!!'
            });
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({
                success:false,
            message:'Email already exists'
        })
        }

        const userSave = await User.create({
            name,
            email,
            password
        });

        if(!userSave){
            return res.status(400).json({
                success:false,
                message:'Registration failed!!Try again later!'
        })
        }

        await userSave.save();

        userSave.password = undefined;

        const token = await userSave.generateJWTToken();

        res.cookie('token',token,cookieOptions);


        res.status(201).json({
            success:true,
            message:'User Registered Successfully',
            user : userSave
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:e,
            error:"error"
        })
    }
  
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const userData = await User.findOne({ email }).select('+password');

        if (!userData || !(await userData.comparePassword(password))) {
            return res.status(400).json({
                success: false,
                message: 'Wrong credentials! Email or Password does not match!!!'
            });
        }

        const token = await userData.generateJWTToken();

        userData.password = undefined;

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'Login successfully',
            user : userData
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message || 'Internal Server Error',
            error: "error"
        });
    }
};


export {
    register,
    login
}