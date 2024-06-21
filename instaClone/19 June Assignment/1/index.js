import app from './app.js';


const PORT = process.env.PORT || 5001;

app.listen(PORT,async ()=>{
    console.log(`localhost is running at PORT : ${PORT}`);
})