let mongoose = require('mongoose');

// create a model class
let User = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    contacts: Array
},
{
  collection: "users"
});

module.exports = mongoose.model('User', User);
