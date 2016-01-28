/**
 * Created by decipher on 25.1.16.
 */
angular.module('quest.controllers', [])

  .controller('QuestController', QuestController)
  .controller('AdminController', AdminController);

QuestController.$inject = ['$scope', '$rootScope', 'tasks', 'pouchService'];
AdminController.$inject = ['$scope', '$rootScope', 'local', 'remote', 'pouchService'];
