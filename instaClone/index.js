import app from './app.js'
import dbConnection from './config/dbConnection.js';
import cloudinary from 'cloudinary';


//Cloudinary configuration 

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5001;

app.listen(PORT,async ()=>{
    await dbConnection();
    console.log(`Localhost is running at PORT ${PORT}`)
});