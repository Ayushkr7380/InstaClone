import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import basicServer from './routes/basicServer.js';


config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/',basicServer)

app.all('*',(req,res,next)=>{
    res.status(404).send('404!! Page Not Found!!!!!');
});


export default app;