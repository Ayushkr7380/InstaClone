import jwt from 'jsonwebtoken';


const LoggedIn = async(req,res,next) =>{
    try {
        const { token } = req.cookies;
        console.log("Tokennnn - ",token);
        if(!token){
            res.status(400).json({
                success:false,
                message:e.message,
                
            })
        } 

        const data = jwt.verify(token,process.env.JWT_KEY);
        console.log("Data --- ",data)
        req.user = data;
        console.log("req.user --- ",req.user); 

        next();
        
    } catch (e) {
        res.status(500).json({
            success:false,
            message:e.message,
            message:'user is not loggedIn'
        })
    }
};

export default LoggedIn;