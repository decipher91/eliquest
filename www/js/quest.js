// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quest', ['ionic', 'pouchdb', 'quest.controllers', 'quest.factories', 'quest.services', 'ngMaterial' ])

  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$ionicConfigProvider', '$mdThemingProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, $mdThemingProvider) {

      $stateProvider

        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.html',
          controller: 'QuestController',
          cache: false,
          resolve: {
            quests: ['Quest', function (Quest) {
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
            results: ['Result', function (Result) {
              return Result.get();
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

  .controller('QuestController', QuestController)
  .controller('AdminController', AdminController);

QuestController.$inject = ['$scope', '$rootScope', 'quests', 'ip', 'pouchService'];
AdminController.$inject = ['$scope', '$rootScope', 'results', 'pouchService'];

/**
 * Created by decipher on 25.1.16.
 */
angular.module('quest.factories', [])

  .factory('Quest', Quest)
  .factory('Result', Result);


Quest.$inject = [];
Result.$inject = ['$q', 'pouchService'];

/**
 * Created by decipher on 25.1.16.
 */
angular.module('quest.services', [])

  .service('pouchService', pouchService)
  .service('ipService', ipService);

pouchService.$inject = [];
ipService.$inject = ['$q', '$http'];

/**
 * Created by decipher on 25.1.16.
 */
function QuestController ($scope, $rootScope, quests, ip, pouchService) {
  'use strict';

  var localDB = pouchService.localDB;

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

};

/**
 * Created by decipher on 25.1.16.
 */
function Quest() {

  'use strict';

  var quests = [
    {
      id: 'question1',
      title: {
        en: 'Question 1',
        ru: 'Вопрос 1'
      },
      text: {
        en: 'How do you rate your English skills?',
        ru: 'Как вы оцениваете свой уровень английского языка?'
      },
      rate: '5'

    },
    {
      id: 'question2',
      title: {
        en: 'Question 2',
        ru: 'Вопрос 2'
      },
      text: {
        en: 'How do you rate your HTML5 skills?',
        ru: 'Как вы оцениваете свои знания HTML5?'
      },
      rate: '5'

    },
    {
      id: 'question3',
      title: {
        en: 'Question 3',
        ru: 'Вопрос 3'
      },
      text: {
        en: 'How do you rate your CSS3 skills?',
        ru: 'Как вы оцениваете свои знания CSS3?'
      },
      rate: '5'

    }
  ];

  return {
    get: function () {

      console.log(quests);
      return quests;
    }
  }
};

/**
 * Created by decipher on 25.1.16.
 */
function Result($q, pouchService) {

  'use strict';

  var localDB = pouchService.localDB;

  return {
    get: function () {
      var result = $q.defer();

      localDB.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (response) {
        console.log(response);
        result.resolve(response);
      }).catch(function (err) {
        result.reject(err);
      });
    }
  }
};

/**
 * Created by decipher on 25.1.16.
 */
function pouchService () {

  'use strict';

  this.localDB = new PouchDB('quest');
}

/**
 * Created by decipher on 25.1.16.
 */
function ipService ($q, $http) {

  'use strict';

  return {
    get: function () {
      var result = $q.defer();
      $http.get('https://ip-api.com/json')
        .success(function (response) {
          result.resolve(response);
        })
        .error(function (response) {
          result.reject(response);
        });
      return result.promise;
    }
  }
};
