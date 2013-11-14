'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'services.htmlService',
    'services.commandService',
    'services.webviewService',
    'controllers.voiceController'
]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/mainContent', {templateUrl: 'partials/mainContent.html', controller: 'MyCtrl1'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]).
  run(function($rootScope) {
      
      $rootScope.url = "http://www.bbc.com/";
  });
