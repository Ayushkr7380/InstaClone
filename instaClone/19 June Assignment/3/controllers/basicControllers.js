const Home  = (req,res,next) =>{
    res.status(200).json({
        msg:'I am homepage'
    })
};

const About = (req,res,next) =>{
    res.status(200).json({
        msg:'I am about page'
    })
};

const Contact = (req,res,next) =>{
    res.status(200).json({
        email:`support@pwskills.com`
    })
};

export {
    Home,
    About,
    Contact
}