/**
 * Created by decipher on 25.1.16.
 */
function AdminController ($scope, local, remote, pouchService) {
  'use strict';

  var localDB = pouchService.localDB;
  var remoteDB = pouchService.remoteDB;

  $scope.lang = 'English';

  $scope.refresh = function(){
    localDB.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      $scope.results = result.rows;
      $scope.$apply();
    }).catch(function (err) {
      console.log(err);
    });
  };

  $scope.refreshRemote = function(){
    remoteDB.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {

      $scope.$apply(function () {
        $scope.results = result.rows;
      });
    }).catch(function (err) {
      console.log(err);
    });
  };

  $scope.refreshRemote();

  $scope.remove = function(id){
    localDB.get(id).then(function(doc) {
      return localDB.remove(doc);
    }).then(function (result) {
      $scope.refresh();
    }).catch(function (err) {
      console.log(err);
    });
  }

};
