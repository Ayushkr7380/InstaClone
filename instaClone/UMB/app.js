import express from 'express'
import { config } from 'dotenv';
import morgan from 'morgan';
import userRoute from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());

app.use('/user',userRoute);

app.all('*',(req,res,next)=>{
    res.status(404).send('Opps!! Page Not Found!!');
});

export default app;