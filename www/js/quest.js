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

/**
 * Created by decipher on 25.1.16.
 */
angular.module('quest.controllers', [])

  .controller('QuestController', QuestController)
  .controller('AdminController', AdminController);

QuestController.$inject = ['$scope', '$translate', '$http', 'tasks', 'pouchService'];
AdminController.$inject = ['$scope', '$translate', 'local', 'remote', 'pouchService'];

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

/**
 * Created by decipher on 25.1.16.
 */
function AdminController ($scope, $translate, local, remote, pouchService) {
  'use strict';

  var localDB = pouchService.localDB;
  var remoteDB = pouchService.remoteDB;

  $scope.lang = 'en';

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };

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

      $scope.$apply(function () {
        $scope.results = result.rows;
      });
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
 // this.remoteDB = new PouchDB("http://172.16.0.25:5984/quiz");
  //this.remoteDB = new PouchDB("couchdb-ccff26.smileupps.com /quiz");
  this.remoteDB = new PouchDB("https://elinext:elinextquiz@elinext.cloudant.com/quiz");
}

/**
 * Created by decipher on 25.1.16.
 */
function ipService ($q, $http) {

  'use strict';

  return {
    get: function () {
      var result = $q.defer();
      var url = 'http://ipv4.myexternalip.com/json';
      $http.get(url)
        .success(function(response) {
        result.resolve(response);
      })
      .error(function(error) {
          console.log(error);
        result.reject(error);
      });
    }
  }
};
