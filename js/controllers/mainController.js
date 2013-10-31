'use strict';

/* Controllers */

angular.module('controllers.mainController', []).
 controller('mainController', ['$scope','$http','speechService','htmlService','commandService','webviewService',
            function($scope,$http, speechService, htmlService,commandService, webviewService) {
                
            var url = $scope.url;
            webviewService.initializeWebview();
            webviewService.navigateTo($scope.url); 
                
            //while(webviewService.isWebviewLoading()==true)
            //{console.log('waiting');}
                
            // Whenever this is called we need to wait until the page is loaded
            // before resuming
            // Can use a scope variable which is set to loading to check.                
                
            // 1. After GO has been said load the webview to the URL.
            // 2  Once loaded show labels, wait for next command etc.
                
            var promise = $http.get(url).then(function (response) {
          
                    // Need to do a check here if the web page is loaded
                    // and if the setting for showNumbers is  true
                    webviewService.showNumbers();
                
                
                    $scope.pageLinks = htmlService.getAllLinks(response.data);
                    console.log($scope.pageLinks[115]);
                   
                    // Now we have all the links to map on.
                    // We are ready for speech recognition to begin.
                
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
                          }
                            
                            switch(action.commandText)
                            {
                                case "SHOWNUMBERS":
                                  webviewService.showNumbers();
                                  break;
                                case "SCROLLDOWN":
                                 //
                                  break;
                                case "GO":
                                     webviewService.navigateTo($scope.url);
                                default:
                                 //
                            }
                        
                          console.log(action);
                            
                        } else {
               
                          console.log(event.results[i][0].transcript);
                        }
                      }
                    };// end on result
                
                
                });

     
  }]);

