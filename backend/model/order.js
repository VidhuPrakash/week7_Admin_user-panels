const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  id: String,
  object: String,
  address_city: String,
  address_country: String,
  address_line1: String,
});

const TokenSchema = new mongoose.Schema({
  id: String,
  object: String,
  card: CardSchema,
  client_ip: String,
  created: Number,
  email: String,
  livemode: Boolean,
  type: String,
  used: Boolean,
  user:String,
  vehicleName:String,
  amount:String
});

const Token = mongoose.model('Token', TokenSchema);

module.exports =  { Token };