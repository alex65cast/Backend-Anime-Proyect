import express from 'express';
import mongoose from 'mongoose';
import routerUser from './entities/user/router.js';
import routerAnimes from './entities/animes/router.js'
// import routerAnime from './entities/animes/router.js';
import config from './config.js';
import cors from 'cors'

const app = express();

mongoose.connect(config.DDBB!).then(()=>{
    console.log('Connected to the database')
}).catch(()=>{
    console.log('Failed to connect database')
})

const handlerError = (err:Error,req,res,next)=>{
    if(err.message === 'NO_USER'){
      return res.status(401).json({code:'NO_USER',message:"This user don't exist"});
    }
    if(err.message === 'WRONG_PASSWORD'){
      return res.status(403).json({code:'WRONG_PASSWORD',message:'Wrong password to log in'});
    }
    if(err.message === 'NOT_AUTHORIZED'){
      return res.status(403).json({code:'NOT_AUTHORIZED',message:'You dont have authorization to do this action'});
    }
    if(err.message === 'NO_TOKEN'){
      return res.status(403).json({code:'NO_TOKEN',message:'There was an error with the log in, try again'});
    }
    if(err.message === 'INFO_LEFT'){
      return res.status(401).json({code:'INFO_LEFT',message:"There's info left to do this action"});
    }
    
    return res.status(500).json({code:'SERVER_ERROR', message: err.message});
    
};

let corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  // allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  optionsSuccessStatus: 204
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/user', routerUser);
app.use('/anime', routerAnimes);
app.use(handlerError);
app.listen(config.PORT, () => console.log(`Server up in port ${config.PORT}`));
