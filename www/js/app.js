// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quest', ['ionic', 'pouchdb', 'quest.controllers', 'quest.factories', 'quest.services', 'ngMaterial', 'pascalprecht.translate'])

  .run(['pouchService',function (pouchService) {
    var localDB = pouchService.localDB;
    var remoteDB = pouchService.remoteDB;
    localDB.sync(remoteDB, {live: true});
  }])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$ionicConfigProvider', '$mdThemingProvider', '$translateProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $ionicConfigProvider, $mdThemingProvider, $translateProvider) {

      $stateProvider

        .state('home', {
          url: '/',
          templateUrl: 'templates/home.html',
          controller: 'QuestController',
          cache: false,
          resolve: {
            tasks: ['Quest', function (Quest) {
              return Quest.get();
            }],
            ip: ['ipService', function (ipService) {
              return ipService.get();
            }]
          }
        })
        .state('admin', {
          url: '/admin',
          templateUrl: 'templates/admin.html',
          controller: 'AdminController',
          cache: false,
          resolve: {
            local: ['Result', function (Result) {
              return Result.getLocal();
            }],
            remote: ['Result', function (Result) {
              return Result.getRemote();
            }]
          }
        });

      $urlRouterProvider.otherwise('/');

      $httpProvider.useApplyAsync(true);
      $ionicConfigProvider.scrolling.jsScrolling(false);
      $ionicConfigProvider.backButton.text('').icon('ion ion-android-arrow-back');

      $mdThemingProvider.theme('default')
        .primaryPalette('amber')
        .accentPalette('deep-purple', {
          'default': '900'
        });

      $translateProvider.translations('en', {
        QUIZ_TITLE: 'New quiz',
        ADMIN_TITLE: 'Results',
        GREETING: 'Welcome',
        ADMIN_GREETING: 'Current Results',
        INIT_BUTTON: 'Start',
        SUBMIT_BUTTON: 'Submit',
        GENDER: 'Gender',
        LOCATION: 'Location',
        REFRESH: 'Refresh',
        REMOVE: 'Remove'
      })
        .translations('ru', {
          QUIZ_TITLE: 'Новая анкета',
          ADMIN_TITLE: 'Результаты',
          GREETING: 'Добро пожаловать',
          ADMIN_GREETING: 'Текущие результаты',
          INIT_BUTTON: 'Поехали!',
          SUBMIT_BUTTON: 'Готово',
          GENDER: 'Пол',
          LOCATION: 'Местоположение',
          REFRESH: 'Обновить',
          REMOVE: 'Удалить'
        });
      $translateProvider.preferredLanguage('en');
      //$translateProvider.determinePreferredLanguage();

    }]);
