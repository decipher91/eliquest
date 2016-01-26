/**
 * Created by decipher on 25.1.16.
 */
function QuestController ($scope, $rootScope, quests, ip, pouchService) {
  'use strict';

  var localDB = pouchService.localDB;
  var remoteDB = pouchService.remoteDB;

  $scope.ip = ip;

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

  $scope.quests = quests;

  $scope.questInitialized = false;

  $scope.initQuest = function(){
    $scope.questInitialized = true;

    $scope.questions = $scope.quests;
    $scope.gender = 'Male';
  };

  $scope.submitQuest = function(){
    if($scope.quests){
      localDB.post({
        quests: $scope.quests,
        gender: $scope.gender,
        ip: $scope.ip.city + ', ' + $scope.ip.country
      }).then(function(response) {
        console.log(response);
        $scope.quests = quests;
        $scope.questInitialized = false;
        $scope.gender = 'Male';
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      alert('no answers provided');
    }
  };

  $scope.$on('add', function(event, quest) {
    console.log(quest);
    $scope.results.push(quest);
    console.log($scope.results);
  });
}
