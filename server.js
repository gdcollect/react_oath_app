import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import blueBird from "bluebird";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const server = createServer(app);

//Import Mongo Connection
import mongoConnect from "./api/config/database";

//Import Authentication
import { isAuthenticated } from "./api/middleware/is-auth";

//Import All Of The Routes
import indexRoute from "./api/routes/";
import userRoute from "./api/routes/user"

//Setup Http-Logger Middleware
app.use(logger('dev'));


//Setup Public Folder
app.use(express.static(path.resolve(__dirname, './public')));

//Setup Body-Parser & Cookie-Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());


//Handling CORS Errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, GET, DELETE'
    );
    res.status(200).json({});
  }
  next();
});


//Setup Authentication Middleware
app.use(isAuthenticated);

//Route for Index
app.use('/user', indexRoute);

//Route for User
app.use('/api/user', userRoute);

//Serve Static Assets If It's in Production
if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static('client/build')
  );

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'build', 'index.html'
      )
    );
  });
}

const port = process.env.PORT || 5000;


//MongoDB Connection>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
mongoose.Promise = blueBird;
mongoConnect(server, port);