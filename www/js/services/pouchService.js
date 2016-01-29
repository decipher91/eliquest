/**
 * Created by decipher on 25.1.16.
 */
function pouchService () {

  'use strict';

  this.localDB = new PouchDB('quest');
 // this.remoteDB = new PouchDB("http://172.16.0.25:5984/quiz");
  this.remoteDB = new PouchDB("couchdb-ccff26.smileupps.com /quiz");
}
