var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/'));

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Pizati is listening at http://%s:%s", host, port)
});
