const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/database');

//Registration Route
router.post('/registration', function(req, res, next)
{
  let newUser = new User({
    name : req.body.name,
    username : req.body.username,
    email : req.body.email,
    password : req.body.password,
    mobileno : req.body.mobileno
  });

  User.addUser(newUser,(err,user)=>{
    if(err)
    {
      res.json({success: false, msg:'Failed to registration.'});
    }
    else
    {
     res.json({success: true, msg:'User Registered.'});
    }
  }); 
});

//Authenticate Route
router.post('/authenticate', function(req, res, next)
{
    const username = req.body.username;
    const password = req.body.password;
    
    User.getUserByUserName(username,(err,user)=>{
      
      if(err) throw err;
      
      if(!user)
      {
        return res.json({success:false, msg:'User not Found'});
      }
      
      User.comparePassword(password,user.password,(err,isMatch)=>{
        
        if(err) throw err;

        if(isMatch)
        {
          const token = jwt.sign(user._doc,config.secret,{ expiresIn : 604800  }); // 604800 = 1 week
          res.json({
            success : true,
            token : 'JWT '+token,
            user : {
              id : user._id,
              name : user.name,
              username : user.username,
              email : user.email
            }
          });
        }
        else
        {
          return res.json({success:false, msg:'Wrong Password'});
        }
      });
    });
});

//Profile Route
router.get('/profile', passport.authenticate('jwt',{session : false}), function(req, res, next)
{
     res.json({user : req.user});
});

module.exports = router;
