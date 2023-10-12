var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserSchema = require('../model/userReg')
const Token = require('../model/order');
const Product = require('../model/addVehicle')
const path = require('path');
const fs = require('fs');
const session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',async function(req,res){
  console.log(req.body);
  const { name,email,phone,city,state,country,pincode,password } = req.body;
  if(name===undefined||email===undefined||phone===undefined||city===undefined||state===undefined||country===undefined||pincode===undefined||password===undefined){
    res.send("empty")
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserSchema({name,email,phone,city,state,country,pincode,password: hashedPassword})
  try{
    await user.save();
    res.send("Successful");
  }catch(error){
    res.send('Error signing up');
  }
});


router.post('/login', async (req, res) => {
  try {
    const { user, pass } = req.body;
    console.log('Received username:', user);
    // Find user by username
    const Log_User = await UserSchema.findOne({ name:user });
    // console.log(Log_User)
    if (!Log_User) {
      // console.log(res);
      return res.send('No login');
    }

    // Check password
    const validPassword = await bcrypt.compare(pass, Log_User.password);
  
    if (validPassword) {
      return res.send('login');
      req.session.userId = Log_User._id;
    }
    else{

      res.send('Invalid  password');
    }
  } catch (error) {
    console.error(error);
    res.send('An error occurred while logging in.');
  }
});

router.get('/vehicle', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.json({ error: 'Internal server error' });
  }
});

router.get('/upload/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'upload', req.params.filename);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(err);
      res.status(404).json({ error: 'File not found' });
    } else {
      res.sendFile(filePath);
    }
  });
});

router.post('/charge', async (req, res) => {
  try {
    const token = new Token(req.body);
    await token.save();
    console.log(token)
    res.status(201).json({ message: 'Token saved successfully!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save token', err });
  }
});


router.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Assume "Order" is your Mongoose model for orders
    const orders = await Token.find({ user: userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
