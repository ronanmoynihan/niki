'use strict';

/* Controllers */

angular.module('controllers.textController', []).
 controller('textController', ['$scope','$http','speechService','htmlService','commandService','webviewService',
            function($scope,$http, speechService, htmlService,commandService, webviewService) {
                
         $scope.submit = function(){   
                
                var input = $scope.textInput;
                var url = "http://www.rte.ie";
                console.log(input);
     
                  var action = commandService.getAction(input,$scope.pageLinks);
                    
                  // Execute the Action    
                  if(action.type=="number"){
                     webviewService.triggerLinkClick(action.number);
                     var promise = $http.get(url).then(function (response) {
                                      webviewService.showNumbers(); 
                              });
                  }
                    
                    switch(action.commandText)
                    {
                        case "shownumbers":
                          webviewService.showNumbers();
                          break;
                        case "scrolldown":
                         //
                          break;
                        case "go":
                            
                             webviewService.navigateTo(url);
                             var promise = $http.get(url).then(function (response) {
                                      webviewService.showNumbers(); 
                              });
                             break;                                         
                        default:
                         //
                    }
                
                  console.log(action);
             
         }
                               
  }]);

