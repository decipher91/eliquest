/**
 * Created by decipher on 25.1.16.
 */
function Result($q, pouchService) {

  'use strict';

  var localDB = pouchService.localDB;
  var remoteDB = pouchService.remoteDB;

  return {
    getLocal: function () {
      var result = $q.defer();

      localDB.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (response) {
        console.log(response);
        result.resolve(response);
      }).catch(function (err) {
        result.reject(err);
      });
    },
    getRemote: function () {
      var result = $q.defer();

      remoteDB.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (response) {
        console.log(response);
        result.resolve(response);
      }).catch(function (err) {
        result.reject(err);
      });
    }
  }
};
