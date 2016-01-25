// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quest', ['ionic', 'pouchdb', 'quest.controllers', 'quest.factories', 'ngMaterial' ])

  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$ionicConfigProvider', '$mdThemingProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, $mdThemingProvider) {

      $stateProvider

        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.html',
          controller: 'QuestController',
          cache: false,
          resolve: {
            challenge: ['Quest', function (Quest) {
              return Quest.get();
            }]
          }
        });

      $urlRouterProvider.otherwise('/home');

      $httpProvider.useApplyAsync(true);
      $ionicConfigProvider.scrolling.jsScrolling(false);
      $ionicConfigProvider.backButton.text('').icon('ion ion-android-arrow-back');

      $mdThemingProvider.theme('default')
        .primaryPalette('amber')
        .accentPalette('deep-purple', {
          'default': '900'
        });

    }]);

/**
 * Created by decipher on 25.1.16.
 */
angular.module('quest.controllers', [])

  .controller('QuestController', QuestController);

QuestController.$inject = ['$scope', '$rootScope'];

/**
 * Created by decipher on 25.1.16.
 */
angular.module('quest.factories', [])

  .factory('Quest', Quest);


Quest.$inject = [];

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

/**
 * Created by decipher on 25.1.16.
 */
function Quest() {

  'use strict';

  return {
    get: function () {
      var quests = [
        {
          id: 'question1',
          title: {
            en: 'How do you rate your English skills?',
            ru: 'Как вы оцениваете свой уровень английского языка?'
          },
          rate: '5'

        },
        {
          id: 'question2',
          title: {
            en: 'How do you rate your HTML5 skills?',
            ru: 'Как вы оцениваете свои знания HTML5?'
          },
          rate: '5'

        }
        {
          id: 'question3',
          title: {
            en: 'How do you rate your CSS3 skills?',
            ru: 'Как вы оцениваете свои знания CSS3?'
          },
          rate: '5'

        }
      ];
      return quests;
    }
  }
};
