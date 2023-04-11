const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "happy Day";


//ROUTE -1
// Create a User using : POST "/api/auth/createuser" (end point).
router.post( "/createuser",body("name").isLength({ min: 5 }),
  body("password").isLength({ min: 5 }),  body("email").isEmail(),
   async (req, res) => {
    let success = false ;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      // check whether the user with this email exits already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, errors: "sorry ,already exits" });
      }
      //salt and hashing
      const salt = await bcrypt.genSalt(10);
     const secPass = await bcrypt.hash(req.body.password,salt)
      //create an new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // .then(user => res.json(user))
      //.catch(err =>{ console.log(err)
      // res.json({error:'please enter a unique value',message:err.message})
      // })
      const data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      
      success = true ;
      res.json({success,authToken});
    }
     catch (error) {
      console.error(error.message);
      res.status(500).send("some error ");
    }
  }
);



//ROUTE 2
//Authentication a User using :POST "/api/auth/login" no login required
router.post(
  "/login",
  body("email",'entre a valid email').isEmail(),
  body("password",'could not be blanked').exists(),
  async (req, res) => {
    let success=false;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try{
      //check whether this email  already exists in db or not
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Login with correct credentials"});
        
      }
      
      
      const passwordCompare = await bcrypt.compare(password,user.password)
      if(!passwordCompare)
      { 
        return res.status(400).json({error:"Login with correct credentials"});
      }
      const data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      success=true;
      
      res.json({success,authToken});
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal error Occured ");
    }
  

  })

  //ROUTE -3
  // /GET loggedin user details using :POST "/api/auth/getuser" login required
  router.post(
    "/getuser",fetchuser,async (req, res) => {
  
  try {
   const userId = req.user.id;
   const user = await User.findById(userId).select("-password"); 
   res.send(user); 
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error Occured ");
    
  }
})
module.exports = router;
