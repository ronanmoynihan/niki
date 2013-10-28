'use strict';

/* Controllers */

angular.module('controllers.mainController', []).
 controller('mainController', ['$scope','speechService','linkService',function($scope, speechService, linkService) {

       speechService.startSpeech();
      
      linkService.getLinksForURL("http://www.rte.ie");
     
  }]);

