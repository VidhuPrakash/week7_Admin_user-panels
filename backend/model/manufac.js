const mongoose = require('mongoose');

const ManufacturerSchema = new mongoose.Schema({
  name: String,
  country: String
});

const Manufacturer = mongoose.model('Manufacturer', ManufacturerSchema);

module.exports = { Manufacturer};
