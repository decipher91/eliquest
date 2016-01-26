/**
 * Created by decipher on 25.1.16.
 */
var express = require('express'),
  app = express();

//set up couchDB via nano driver
var nano = require("nano")("http://localhost:5984");

// create and use db
nano.db.create('quiz');

/*nano.db.create('books', function() {
  // specify the database we are going to use
  var books = nano.use('books');
  // and insert a document in it
  alice.insert({ crazy: true }, 'rabbit', function(err, body, header) {
    if (err) {
      console.log('[alice.insert] ', err.message);
      return;
    }
    console.log('you have inserted the rabbit.')
    console.log(body);
  });
});*/
var quiz = nano.db.use('quiz');

quiz.list(function(err, body){
  console.log(body);
});

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
