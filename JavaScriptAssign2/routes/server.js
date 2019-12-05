const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const PORT = 3000;
app.listen(PORT, function (req, res) {
    console.log('Server is running on PORT: ', PORT);
});