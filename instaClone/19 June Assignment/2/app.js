import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan'; 
import webCounter from './routers/webCounter.js'

config();

const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

const counter = 0;
app.use('/',webCounter);

app.all('*',(req,res,next)=>{
    res.status(404).send('404!! Page Not Found!!');
});

export default app;