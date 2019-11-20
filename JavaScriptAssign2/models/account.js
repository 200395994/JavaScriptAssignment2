var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema(
    {
        username: String,
        password: String
    }
);

module.exports = mongoose.model('Account', AccountSchema);