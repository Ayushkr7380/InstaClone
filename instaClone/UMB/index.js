import app from './app.js'
import connectionToDB from './config/dbConnection.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT,async ()=>{
    await connectionToDB();
    console.log(`Localhost is running at PORT ${PORT}`);
})