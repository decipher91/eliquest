/**
 * Created by decipher on 25.1.16.
 */
function QuestController ($scope, $translate, $http, tasks, pouchService) {
  'use strict';

  var self = this;

  var localDB = pouchService.localDB;
  var remoteDB = pouchService.remoteDB;

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };

  var url = 'http://ipv4.myexternalip.com/json';
  $http.get(url)
    .success(function(response) {
      $scope.ip = response.ip;
    })
    .error(function(error) {
      $scope.ip = 'ip not recognized'
    });

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

  $scope.lang = 'en';
  $scope.results = [];

  $scope.tasks = tasks;

  $scope.questInitialized = false;

  $scope.initQuest = function(){
    $scope.questInitialized = true;
    $scope.gender = $scope.genders.male;
  };


  $scope.setValue = function(value){
    if (value == 'Female'){
      $scope.gender = $scope.genders.female;
    } else {
      $scope.gender = $scope.genders.male;
    }
  };

  $scope.submitQuest = function(){
    if($scope.tasks){
      localDB.post({
        tasks: $scope.tasks,
        gender: $scope.gender,
        ip: $scope.ip
      }).then(function(response) {
        console.log(response);
        $scope.$apply(function () {
          $scope.tasks = tasks;
          $scope.questInitialized = false;
          $scope.gender = $scope.genders.male;
          $scope.userGender === $scope.genders.male;
        })
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      alert('no answers provided');
    }
  };
}
