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
