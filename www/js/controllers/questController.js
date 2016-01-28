/**
 * Created by decipher on 25.1.16.
 */
function QuestController ($scope, $rootScope, tasks, pouchService) {
  'use strict';

  var localDB = pouchService.localDB;
  var remoteDB = pouchService.remoteDB;

  //$scope.ip = ip;

  console.log(tasks);

  localDB.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    console.log(result);
  }).catch(function (err) {
    console.log(err);
  });

  $scope.lang = 'English';
  $scope.results = [];

  $scope.tasks = tasks;

  $scope.questInitialized = false;

  $scope.initQuest = function(){
    $scope.questInitialized = true;
    $scope.gender = 'Male';
  };

  $scope.submitQuest = function(){
    if($scope.tasks){
      localDB.post({
        tasks: $scope.tasks,
        gender: $scope.gender
        //ip: $scope.ip.city + ', ' + $scope.ip.country
      }).then(function(response) {
        $scope.tasks = tasks;
        $scope.questInitialized = false;
        $scope.gender = 'Male';
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      alert('no answers provided');
    }
  };
}
