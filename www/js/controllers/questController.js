/**
 * Created by decipher on 25.1.16.
 */
function QuestController ($scope, quests) {
  'use strict';

  $scope.quests = quests;

  console.log(quests);

  $scope.questInitialized = false;

  $scope.initQuest = function(){
    $scope.questInitialized = true;

    $scope.questions = {
      question1: {
        rate: 5
      },
      question2: {
        rate: 5
      },
      question3: {
        rate: 5
      }
    }
  };

  $scope.submitQuest = function(){

  };
}
