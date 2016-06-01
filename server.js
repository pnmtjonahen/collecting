var express = require('express');
var app = express();

app.use('/data', express.static(__dirname + '/data'));
app.use('/', express.static(__dirname + '/app'));

app.listen(3000);