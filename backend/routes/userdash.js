var express = require('express')
const Product = require('../model/addVehicle')
const multer = require('multer');
const path = require('path')
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Token = require('../model/order');
var router = express.Router();

//Show vehicles to the user
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


//   router.get("/config", (req, res) => {
//     res.send({
//       publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
//     });
//   });
  
  
module.exports = router;