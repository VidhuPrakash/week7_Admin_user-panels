var express = require('express');
const bcrypt = require('bcrypt');
const AdminLog = require('../model/adminSchema')
const Product = require('../model/addVehicle')
const path = require('path')
const fs = require('fs');
const { Manufacturer } = require('../model/manufac');
const { VehicleModel } = require('../model/model')
const { Token } = require('../model/order') 
const multer = require('multer');
var router = express.Router();


const storage = multer.diskStorage({
  destination: './upload/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

  },
});

const upload = multer({ storage:storage });

router.post('/login', async function(req, res, next) {
  const {name,password} = req.body;
  const adminD = await AdminLog.findOne({name});
  if(!adminD){
    console.log("Wrong");
    return res.send("Access Denied!!")
  }
  else{
  const validPassword = await bcrypt.compare(password,adminD.password);
  if(!validPassword){
    console.log("Wrong password");
    return res.send('Password is incorrect');
  }
  console.log("okk");

  res.send("Login successful");
}});



// POST route to create a new product with an image
router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      manufacturer,
      model,
      price,
      description,
      quantity,
    } = req.body;

    const imagePath = req.file.filename; // The path to the uploaded image

    const newProduct = new Product({
      name,
      manufacturer,
      model,
      price,
      image: imagePath, // Save the image path in the database
      description,
      quantity,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  // Update fields from req.body
  product.name = req.body.name;
  product.manufacturer = req.body.manufacturer;
  product.model = req.body.model;
  product.price = req.body.price;

  // Save the updated product
  await product.save();

  res.send(product);
});

router.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.delete('/products/:id', async (req, res) => {
  const deletedUser = await Product.findByIdAndRemove(req.params.id);
res.send(deletedUser);
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


router.get('/manufacturers', async (req, res) => {
  // Fetch all manufacturers from your database and send them as a response
  // This is just a placeholder. Replace it with your actual logic.
  const manufacturers = await Manufacturer.find({});
  res.json(manufacturers);
});

// Route to get all models
router.get('/models', async (req, res) => {
  // Fetch all models from your database and send them as a response
  // This is just a placeholder. Replace it with your actual logic.
  const models = await VehicleModel.find({});
  res.json(models);
});


router.get('/orders', async (req, res) => {
  try {
    // Fetch orders from MongoDB
    const orders = await Token.find({});
    res.json(orders);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send(err);
  }
});


module.exports = router;
