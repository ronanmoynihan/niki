'use strict';

/* Controllers */

angular.module('controllers.mainController', []).
 controller('mainController', ['speechService','linkService',function(speechService, linkService) {

       speechService.startSpeech();
      
      linkService.getLinksForURL("http://www.rte.ie");
     
  }]);

