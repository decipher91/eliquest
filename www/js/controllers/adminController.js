/**
 * Created by decipher on 25.1.16.
 */
function AdminController ($scope, $rootScope, local, remote, pouchService) {
  'use strict';

  var localDB = pouchService.localDB;
  var remoteDB = pouchService.remoteDB;

  console.log(local);
  console.log(remote);

  $scope.lang = 'English';

  $scope.refresh = function(){
    localDB.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      console.log(result.rows);
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
      console.log(result.rows);
      $scope.results = result.rows;
      $scope.$apply();
    }).catch(function (err) {
      console.log(err);
    });
  };

  $scope.refreshRemote();

  $scope.remove = function(id){
    localDB.get(id).then(function(doc) {
      return localDB.remove(doc);
    }).then(function (result) {
      console.log(result);
      $scope.refresh();
    }).catch(function (err) {
      console.log(err);
    });
  }

};
