const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//App Init
const app = express();

//Database Connection
mongoose.connect(config.database , {useMongoClient : true});
mongoose.connection.on('connected',() => {
  console.log('Connected to Database : '+ config.database);
});

//Database Error
mongoose.connection.on('error',(err) => {
  console.log('Database Error : '+ err);
});

//Port Number
const port = 3000;

const userRoutes = require('./routes/users');

//CORS Middleware
app.use(cors());

//Body-Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Routing
app.use('/user',userRoutes);

//Index Route
app.get('/',(req,res)=>{
  res.send('HOME PAGE');
});

//Server Start
app.listen(port,() => {
  console.log('Server started on port : '+port);
});
