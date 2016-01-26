/**
 * Created by decipher on 25.1.16.
 */
function pouchService () {

  'use strict';

  this.localDB = new PouchDB('quest');
  this.remoteDB = new PouchDB("http://localhost:5984/quiz");
}
