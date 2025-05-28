const loginDataValidator = async(req,res,next) =>{

    const { username , password } = req.body;

    if(!username || !password){
        return res.status(400).json({
            success:false,
            message:'All fields are required!!'
        });
    };

    next();
}

export default loginDataValidator;