var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const saveUser = require('./config/adminDtl')
const cors = require('cors');
const session = require('express-session');
// const  manufacturersData = require('./model/manufac')
// const vehicleModelsData = require('./model/model')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userdashboard = require('./routes/userdash')
const {Manufacturer,VehicleModel } = require('./model/manufac');


var app = express();
mongoose.connect('mongodb://127.0.0.1:27017/Week7'); 

//  add admin password and name 
// saveUser('admin', 'admin');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/admin', indexRouter);
app.use('/', usersRouter);
app.use('/userdashboard',userdashboard)
app.use(
  session({
    secret: '121',
    resave: false,
    saveUninitialized: false,
  })
);

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2022-08-01",
// });

// app.get('/upload/:filename', (req, res) => {
//   res.sendFile(path.join(__dirname, 'upload', req.params.filename));
// });

// const manufacturersData = [
//     { name: 'Toyota' },
//     { name: 'Honda' },
//     { name: 'Maruti' },
//     { name: 'Mahindra' },
//     { name: 'Tata' },

//     // Add more manufacturers as needed
//   ];
  
  // Hardcoded vehicle models
  // const vehicleModelsData = [
  //   { name: 'Innova', manufacturer: 'Toyota' },
  //   { name: 'Alto', manufacturer: 'Maruti Suzuki' },
  //   { name: 'XUV', manufacturer: 'Mahindra' },
  //   { name: 'Baleno', manufacturer: 'Maruti Suzuki' },
  //   { name: 'XUV', manufacturer: 'Mahindra' },
  //   { name: '', manufacturer: 'Mahindra' },
  //   // Add more vehicle models as needed
  // ];

//   manufacturersData.forEach(async (manufacturerData) => {
//     const manufacturer = new Manufacturer(manufacturerData);
//     await manufacturer.save();
//   });
  
  // vehicleModelsData.forEach(async (vehicleModelData) => {
  //   const vehicleModel = new VehicleModel(vehicleModelData);
  //   await vehicleModel.save();
  // });
  // Function to create manufacturers and vehicle models






module.exports = app;
