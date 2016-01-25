/**
 * Created by decipher on 25.1.16.
 */
function AdminController ($scope, $rootScope, results, pouchService) {
  'use strict';

  var localDB = pouchService.localDB;

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

  $scope.refresh();

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

  //$scope.results = results;

};
