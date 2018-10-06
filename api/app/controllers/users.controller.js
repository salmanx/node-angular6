const bcrypt = require('bcryptjs');

const User = require("../models/user.model");
const AuthHelper = require("../services/auth_helper");

module.exports = {
  index: (req, res) => {
    User.find((err, users) => {
      if(!err)
        return res.status(200).send(users);
      
    })
  },

  signUp: (req, res) => {
    
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    User.findOne({ email: email}, (err, foundUser) => {
      if(foundUser)
        return res.status(409).send({ message: "Email is already used!" })

      if(!err){
        let user = new User(req.body);

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if(!err){
              user.password = hash;
              user.save((err, result) => {
                if(!err)
                  return res.status(200).send({ token: AuthHelper.createToken(result) });          
              });
            }              
          });
        });
      }        
    });
  },

  signIn: (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
      if(!user) 
        return res.status(401).send({ message: "No email found!" });

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result === true) {
          return res.status(200).send({ message: "You have successfully logged in.", token: AuthHelper.createToken(user) });
        } else {
          return res.status(401).send({ message: "Email/password did not match!" });
        }
      });        
    })
  }
}

