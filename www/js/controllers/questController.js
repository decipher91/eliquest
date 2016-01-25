/**
 * Created by decipher on 25.1.16.
 */
function QuestController ($scope, $rootScope, quests, pouchService) {
  'use strict';

  var localDB = pouchService.localDB;
  localDB.info().then(function (info) {
    console.log(info);
  });

  localDB.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    console.log(result);
  }).catch(function (err) {
    console.log(err);
  });

  $scope.results = [];

  $scope.quests = quests;

  console.log(quests);

  $scope.questInitialized = false;

  $scope.initQuest = function(){
    $scope.questInitialized = true;

    $scope.questions = $scope.quests;
    $scope.gender = 'Male';
  };

  $scope.submitQuest = function(){
    console.log($scope.quests);
    if($scope.quests){
      localDB.post({
        quests: $scope.quests,
        gender: $scope.gender
      }).then(function(response) {
        console.log(response);
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
