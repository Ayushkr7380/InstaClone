import express from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import dataRouters from './routes/dataRouters.js'

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'))

app.use('/ayush',(req,res)=>{
    res.send('i am ayush');
});

app.use('/',dataRouters);

app.all('*',(req,res)=>{
    res.status(404).send('404!!! page not found!!!');
});

export default app;