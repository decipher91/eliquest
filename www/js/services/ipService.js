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
