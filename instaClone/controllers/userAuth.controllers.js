import User from '../models/userAuth.model.js'
import Post from '../models/userPost.model.js'
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const cookieOptions = {
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
    secure : true
}
const userRegister = async (req,res,next) =>{
    try {
        
        const { name , username , email , password , bio } = req.body;
        
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({
                success:false,
                message:'Email already exists!!'
            });
        }
        const user = await User.create(
            {
                name,
                username,
                email,
                password,
                bio
        }
        );
        if (!user){
            return res.status(400).json({
                success:false,
                message:'Registration failed',
            })
        }
        await user.save();

        const token = await user.generateJWTToken();

        res.cookie('token',token,cookieOptions);

        user.password = undefined;

        res.status(200).json({
            success:true,
            message:'User registered successfully',
            user
        })
        // res.redirect('/auth/login');
        

    } catch (e) {
            res.status(500).json({
                success:false,
                message:e.message
            })
    }
};

const userRegisterGet = (req,res,next) =>{
    res.status(200).render('register');
};

const userLogin = async (req,res,next) =>{
    try {
        const { username , password } = req.body; 
        console.log(password);
        
        const userExists = await User.findOne({username}).select('+password');
        console.log('password is ',userExists.password)

        if(!userExists || !(await userExists.comparePassword(password))){
            return res.status(400).json({
                success:false,
                message:'Username or Password is Incorrect!!'
            });
        }

        const token  = await userExists.generateJWTToken();

        res.cookie('token',token,cookieOptions);

        userExists.password = undefined;

        res.status(200).json({
            success:true,
            message:'User login successfully',
            userExists 
        })
    } catch (e) {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
};

const userLoginGet = (req,res,next) =>{
    res.status(200).render('login');
};

const userDetails = async (req,res,next)=>{
    try {
        const userId = req.user.id;
    
        const user = await User.findById(userId).select('-password');

        const post = await Post.find({user});


        res.status(200).render('userdetails',{user,post});

        // res.status(200).json({
        //     success:true,
        //     message:'User details',
        //     user,
        //     post
        // });

    } catch(e) {
        res.status(500).json({
            success:false,
            message:'Failed to fetch user details',
        });
    }
};

const userLogout = async(req,res,next) =>{
    try {
        res.cookie('token',null,{
            maxAge:0,
            secure:true,
            httpOnly:true
        });
    
        res.status(200).json({
            success:true,
            message:'User Successfully Logout'
        });
    } catch (e) {
        res.status(500).json({
            success:false,
            message:'No User is LoggedIn'
        });
    }
    
}

const updateProfile = async(req,res,next)=>{
    try {
    
    const userId = req.user.id;

    const { name , bio } = req.body;

    const user = await User.findById(userId).select('-password');
    if(!user){
        return res.status(400).json({
            success:false,
            message:'Authentication failed!!'
        })
    }

    user.name = name;
    user.bio = bio;

    await user.save();

    // if(!req.file){
    //     return res.status(400).json({
    //         success:false,
    //         message:'Please select the photo!!'
    //     })
    // }

    console.log(req.file);

    if (req.file){
          
        
        try{
            const  result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'instacloneprofilephoto',
                width:400,
                height:400,
                gravity:'faces',
                crop:'fill'
            });

            if (result){
                user.profile = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                };
                await user.save();

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
    res.status(200).json({
        success:true,
        message:'profile Updated'
    })
    
    

        
} catch (e) {
    return res.status(500).json({
        message:e.message,
        success:false,
        
    });
}
    
};
export {
    userRegister,
    userRegisterGet,
    userLogin,
    userLoginGet,
    userDetails,
    userLogout,
    updateProfile
}