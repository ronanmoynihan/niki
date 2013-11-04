'use strict';

/* Controllers */

angular.module('controllers.voiceController', []).
 controller('voiceController', ['$scope','$http','speechService','htmlService','commandService','webviewService',
            function($scope,$http, speechService, htmlService,commandService, webviewService) {
                
            var url = $scope.url;
            webviewService.initializeWebview();
                
            webviewService.navigateTo($scope.url);
            var promise = $http.get($scope.url).then(function (response) {
                                 
                     webviewService.showNumbers(); 
                        //$scope.pageLinks = htmlService.getAllLinks(response.data);
                        //console.log($scope.pageLinks[115]);

                  });
           
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.start();
                               
            // on Start
            recognition.onstart = function() {
                console.log('starting webkitSpeechRecognition: ' +  new Date().toString('yyyy-MM-dd') );
            }; // end start
      
            
           // on Error
           recognition.onerror = function(event) {
                if (event.error == 'no-speech') { console.log('error - no speech');}
                if (event.error == 'audio-capture') { console.log('error - audio-capture');}
                if (event.error == 'not-allowed'){ console.log('error - audio-capture');}  
            }; // end error
      
            
            // on end
            recognition.onend = function() {
                var date = new Date(event.timeStamp);
                console.log('end webkitSpeechRecognition: ' + date.toString('yyyy-MM-dd') );  
        
                recognition.start();
            } // end on end
          
            // on result
            recognition.onresult = function(event) {
            
              var interim_transcript = '';
              for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
    
                  console.log(event.results[i][0].transcript);
                    
                  // call a service which will determine what action to take.
                  var speechInput = event.results[i][0].transcript;     
                  var action = commandService.getAction(speechInput,$scope.pageLinks);
                    
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
                        case "down":
                            webviewService.scrollDown();
                         //
                          break;
                        case "up":
                            webviewService.scrollUp();
                         //
                          break;
                        case "go":
                            
                             webviewService.navigateTo($scope.url);
                             var promise = $http.get($scope.url).then(function (response) {
                                      webviewService.showNumbers(); 
                              });
                             break;                                         
                        default:
                         //
                    }
                
                  console.log(action);
                    
                } else {
       
                  console.log(event.results[i][0].transcript);
                }
              }
            };// end on result
                
  }]);

