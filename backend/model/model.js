const mongoose = require('mongoose');

const VehicleModelSchema = new mongoose.Schema({
  name: String,
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer' },
});

const VehicleModel = mongoose.model('VehicleModel', VehicleModelSchema);

module.exports = { VehicleModel };
