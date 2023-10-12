var User = require("../model/adminSchema");
var bcrypt = require("bcrypt");

async function saveUser(username, password) {
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    // Create a new Admin
    const admin = new User({
      name: username,
      password: hashedPassword,
    });
  
    try {
      // Save the admin username and password to the database
      await admin.save();
      console.log('User saved successfully');
    } catch (err) {
      console.error(err);
    }
  }
  
  module.exports = saveUser;