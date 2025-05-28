import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import userAuth from './routes/userAuth.js';
import  userPost  from './routes/userPost.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';


config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(cors({
    credentials:true
}));

// app.use(cors({
//     origin: 'http://instacloneinstance.eba-jae7t62p.ap-south-1.elasticbeanstalk.com',  // Your backend URL
//     credentials: true,  // Allow cookies
// }));


app.use('/static',express.static('static'));

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/auth',userAuth);

// Redirect root path to /auth/login
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});


app.use('/',userPost);


app.all('*',(req,res,next)=>{
    res.status(404).send('404 !! Page not found!!!!!!!!!');
});

export default app;