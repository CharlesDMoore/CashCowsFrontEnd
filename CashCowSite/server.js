var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));
app.use(express.static(__dirname + '/web'));
var server = app.listen(process.env.PORT || 8000, () => {
console.log('Listening on port %d', server.address().port);
});
module.exports = app;