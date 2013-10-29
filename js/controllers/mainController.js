'use strict';

/* Controllers */

angular.module('controllers.mainController', []).
 controller('mainController', ['$scope','$http','speechService','htmlService',
            function($scope,$http, speechService, htmlService) {

            // This should come from the UI binding
  
            var url = $scope.url;
                
            var promise = $http.get(url).then(function (response) {
          
                    console.log('before pageLinks is set');
                    $scope.pageLinks = htmlService.getAllLinks(response.data);
                    console.log($scope.pageLinks);
                    console.log('pageLinks is set');
                  
                    // Now we have all the links to map on.
                    // We are ready for speech recognition to begin.
                    speechService.startSpeech();
                    
                    
                    var webview = document.querySelector('webview');
                   
                    for (var i=0;i<100;i++)
                    { 
                        webview.executeScript({code: "document.links[" + i + "].innerHTML+='.' + " + i.toString()});
                        //   webview.executeScript({code: "document.links[" + i + "].setAttribute('data-hint','" + i + "')"});   
                        //   webview.executeScript({code: "document.links[" + i + "].className+= ' ' + 'hint--right     hint--always hint--success'"});
                    }
            
                    document.querySelector('webview').insertCSS({file:"hint.css"},function(){console.log('css inserted');});

                    // webview.executeScript({code: "document.links[5].click()"});
                });

     
  }]);

