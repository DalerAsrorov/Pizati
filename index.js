var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/'));
app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Pizati listening at http://%s:%s", host, port)
});
