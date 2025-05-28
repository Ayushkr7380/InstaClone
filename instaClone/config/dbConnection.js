import mongoose from 'mongoose';

mongoose.set('strictQuery',false);
const dbConnection = async () =>{
    try {
        const { connection }  = await mongoose.connect(process.env.MONGO_URI);
        if(!connection){
            console.log(`Connection to DB failed!! try again later!!`);
        }
        else{
            console.log(`Connected to database ${connection.host}`);
        }
        
    } catch (e) {
        console.log(e)
        process.exit(1);
    }

};

export default dbConnection;