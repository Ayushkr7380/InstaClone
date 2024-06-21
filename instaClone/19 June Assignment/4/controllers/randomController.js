const random  = (req,res,next) =>{
    res.status(200).json({
        "random":req.randomNumber
    })
};
 export default random;