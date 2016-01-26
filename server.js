/**
 * Created by decipher on 25.1.16.
 */
var express = require('express'),
  app = express();

//set up couchDB via nano driver
var nano = require("nano")("http://localhost:5984");

// create and use db
nano.db.create('quiz');
var quiz = nano.db.use('quiz');

app.use(express.static('www'));
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
