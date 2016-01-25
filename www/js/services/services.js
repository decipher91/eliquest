/**
 * Created by decipher on 25.1.16.
 */
angular.module('quest.services', [])

  .service('pouchService', pouchService)
  .service('ipService', ipService);

pouchService.$inject = [];
ipService.$inject = ['$q', '$http'];
