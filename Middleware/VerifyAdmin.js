const jwt = require("jsonwebtoken");
require('dotenv').config()

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "shhhhh", (err, user) => {
      if (err){
        return res.send({message:"Token is not valid"})
      }
      req.user = user;
      next();
    });
  }
  else {
    return res.send({message:"You are not authenticated"});
  }
};


const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.isAdmin) {
      next();
    } 
    else {
      return res.send({message:"You are not allowed to do that..."});
    }
  });
};

module.exports =  {verifyTokenAndAdmin}