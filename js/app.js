'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'services.speechService','services.linkService', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/mainContent', {templateUrl: 'partials/mainContent.html', controller: 'MyCtrl1'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]).
  run(function(speechService, linkService) {
      
     
      // This is effectively part of the main method initialization code
      speechService.startSpeech();
      
      linkService.getLinksForURL("http://www.rte.ie");
     
  });
