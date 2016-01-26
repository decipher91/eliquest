/**
 * Created by decipher on 25.1.16.
 */
angular.module('quest.factories', [])

  .factory('Quest', Quest)
  .factory('Result', Result);


Quest.$inject = ['$q', '$http'];
Result.$inject = ['$q', 'pouchService'];
