var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

var clientSchema = new mongoose.Schema({
    name: String,
    email: String
}, { collection: 'client' }
);

module.exports = { Mongoose: mongoose, ClientSchema: clientSchema }