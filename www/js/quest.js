// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quest', ['ionic', 'pouchdb', 'quest.controllers', 'quest.factories', 'quest.services', 'ngMaterial'])

  .run(['pouchService',function (pouchService) {
    var localDB = pouchService.localDB;
    var remoteDB = pouchService.remoteDB;
    localDB.sync(remoteDB, {live: true});
  }])

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
            local: ['Result', function (Result) {
              return Result.getLocal();
            }],
            remote: ['Result', function (Result) {
              return Result.getRemote();
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
AdminController.$inject = ['$scope', '$rootScope', 'local', 'remote', 'pouchService'];

/**
 * Created by decipher on 25.1.16.
 */
angular.module('quest.factories', [])

  .factory('Quest', Quest)
  .factory('Result', Result);


Quest.$inject = ['$q', '$http'];
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

/**
 * Created by decipher on 25.1.16.
 */
function AdminController ($scope, $rootScope, local, remote, pouchService) {
  'use strict';

  var localDB = pouchService.localDB;
  var remoteDB = pouchService.remoteDB;

  console.log(local);
  console.log(remote);

  $scope.lang = 'English';

  $scope.refresh = function(){
    localDB.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      $scope.results = result.rows;
      $scope.$apply();
    }).catch(function (err) {
      console.log(err);
    });
  };

  $scope.refreshRemote = function(){
    remoteDB.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      $scope.results = result.rows;
      $scope.$apply();
    }).catch(function (err) {
      console.log(err);
    });
  };

  $scope.refreshRemote();

  $scope.remove = function(id){
    localDB.get(id).then(function(doc) {
      return localDB.remove(doc);
    }).then(function (result) {
      $scope.refresh();
    }).catch(function (err) {
      console.log(err);
    });
  }

};

/**
 * Created by decipher on 25.1.16.
 */
function Quest($q, $http) {

  'use strict';

  return {
    get: function () {
      var result = $q.defer();
      $http({method: 'GET', url: 'tasks.json'})
        .success(function (response) {
          console.log(response);
          result.resolve(response);
        })
        .error(function (response) {
          result.reject(response);
        });
      return result.promise;
    }
  }
};

/**
 * Created by decipher on 25.1.16.
 */
function Result($q, pouchService) {

  'use strict';

  var localDB = pouchService.localDB;
  var remoteDB = pouchService.remoteDB;

  return {
    getLocal: function () {
      var result = $q.defer();

      localDB.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (response) {
        result.resolve(response);
      }).catch(function (err) {
        result.reject(err);
      });
    },
    getRemote: function () {
      var result = $q.defer();

      remoteDB.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (response) {
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
  this.remoteDB = new PouchDB("http://localhost:5984/quiz");
}

/**
 * Created by decipher on 25.1.16.
 */
function ipService ($q, $http) {

  'use strict';

  return {
    get: function () {
      var result = $q.defer();
      $http.get('http://ip-api.com/json')
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
