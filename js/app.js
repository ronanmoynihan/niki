'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'myApp.filters', 
    'services.speechService',
    'services.htmlService',
    'services.commandService', 
    'myApp.directives', 
    'controllers.mainController'
]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/mainContent', {templateUrl: 'partials/mainContent.html', controller: 'MyCtrl1'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]).
  run(function($rootScope, speechService, htmlService) {
      
      $rootScope.url = "http://www.bbc.com";
  });
