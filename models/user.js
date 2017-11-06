const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const userSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  username : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  mobileno : {
    type : String,
    required : true
  },
  create_date : {
    type : Date,
    default : Date.now
  }
});

const User = module.exports = mongoose.model('User' , userSchema);

//User's Functions
module.exports.getUserById = function(id,callback)
{
  User.findById(id,callback);
}

module.exports.getUserByUserName = function(username,callback)
{
  var query = {username : username};
  User.findOne(query,callback);
}

module.exports.addUser = function(newUser,callback)
{
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(newUser.password,salt,(err,hash)=>{
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword,hashPassword,callback)
{
  bcrypt.compare(candidatePassword,hashPassword,(err,isMatch)=>{
    if(err) throw err;
    callback(null,isMatch);
  })
}
