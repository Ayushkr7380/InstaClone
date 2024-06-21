const randonNumberGenerator = (req,res,next) =>{

    let randomNumber = Math.floor(Math.random() * 100) + 1;
    req.randomNumber = randomNumber;

    next();
}
 export default randonNumberGenerator;