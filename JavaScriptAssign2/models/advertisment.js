var mongoose = require('mongoose');

var AdvertismntSchema = new mongoose.Schema(
    {
        productname: String,
        description: String,
        price: Number
    }
);

module.exports = mongoose.model('Advertise', AdvertismntSchema);