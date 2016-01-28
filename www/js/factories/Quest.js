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
