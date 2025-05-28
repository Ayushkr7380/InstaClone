const signUpDataValidator = async(req,res,next) =>{

    const { name, username , email , password } = req.body;

    if(!name || !username || !email || !password ){
        return res.status(400).json({
            success:false,
            message:'All fields are required!!'
        });
    };

    next();
};

export default signUpDataValidator;