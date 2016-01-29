/**
 * Created by decipher on 25.1.16.
 */
function QuestController ($scope, tasks, ip, pouchService) {
  'use strict';

  var self = this;

  var localDB = pouchService.localDB;
  var remoteDB = pouchService.remoteDB;

  $scope.ip =  ip ? ip.ip : 'ip not recognized';

  $scope.genders = {
    male: {
      value: 'Male',
      text: {
        ru: 'Мужчина',
        en: 'Male'
      }
    },
    female:  {
      value: 'Female',
      text: {
        ru: 'Женщина',
        en: 'Female'
      }
    }
  };

  $scope.lang = 'English';
  $scope.results = [];

  $scope.tasks = tasks;

  $scope.questInitialized = false;

  $scope.initQuest = function(){
    $scope.questInitialized = true;
    $scope.gender = 'Male';
  };

  $scope.setValue = function(value){
    console.log(value);
  };

  $scope.submitQuest = function(){
    console.log($scope.gender);
    if($scope.tasks){
      localDB.post({
        tasks: $scope.tasks,
        gender: $scope.gender,
        ip: $scope.ip.ip
      }).then(function(response) {
        console.log(response);
        $scope.$apply(function () {
          $scope.tasks = tasks;
          $scope.questInitialized = false;
          $scope.gender = 'Male';
        })
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      alert('no answers provided');
    }
  };
}
