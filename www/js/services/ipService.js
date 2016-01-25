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
