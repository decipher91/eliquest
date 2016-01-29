/**
 * Created by decipher on 25.1.16.
 */
angular.module('quest.controllers', [])

  .controller('QuestController', QuestController)
  .controller('AdminController', AdminController);

QuestController.$inject = ['$scope', '$translate', '$http', 'tasks', 'pouchService'];
AdminController.$inject = ['$scope', '$translate', 'local', 'remote', 'pouchService'];
