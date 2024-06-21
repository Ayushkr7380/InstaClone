let counter = 0;

const showCounter = (req,res,next) =>{
    res.status(200).json({
        "counter":counter
    });
};

const incrementCounter = (req,res,next) =>{
    counter = counter + 1;
    res.status(200).json({
        "counter":counter
    })
};

const decrementCounter = (req,res,next) =>{
    counter = counter - 1
    res.status(200).json({
        "counter":counter
    })
};

export {
    showCounter,
    incrementCounter,
    decrementCounter
}