var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apimongodb');

var clientSchema = new mongoose.Schema({
    name: String,
    email: String
}, { collection: 'client' }
);

module.exports = { Mongoose: mongoose, ClientSchema: clientSchema }