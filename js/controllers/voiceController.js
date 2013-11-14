'use strict';

/* Controllers */

angular.module('controllers.voiceController', []).
 controller('voiceController', ['$scope','$http','$timeout','htmlService','commandService','webviewService',
            function($scope,$http,$timeout,htmlService,commandService, webviewService) {
                
          
            $scope.go = function(){

                    $scope.showStartScreen = false;
    
                    var url = htmlService.getURL($scope.url);
                    $scope.url = url;
     
                    webviewService.navigateTo(url);
                    var promise = $http.get(url).then(function (response) {
                                    $scope.pageLinks = htmlService.getAllLinks(response.data);
                                  });
                    };
                
            $scope.showStartScreen = function(){
                $scope.showStartScreen = true;
                console.log('showing startup screen');
            };
              
            $scope.init = function(){
                
                $scope.showStartScreen = true;
                $scope.micStatus = "off";
                $scope.numbersStatus = "on";
                $scope.niki = "on";
                
                $scope.microphoneurl = "css/images/microphone.gif";
                console.log('init function');
                $scope.speechInput = "Listening...";
                
                /* Used to update pageLinks if the URL changes*/
                var updatePageLinks = function() {
                                
                    var newURL = document.querySelector('#location').value;
                    if(newURL!=$scope.url){
                        
                        console.log('page links should be updated now');
                        var promise = $http.get(newURL).then(function (response) {
                                         $scope.pageLinks = htmlService.getAllLinks(response.data);
                                         $scope.url = newURL;
                                      });
                    }
                        
                };
                
                setInterval(updatePageLinks,1000);
                /* End of pageLinks update code.*/
                  
                webviewService.initializeWebview();
                
                 var showNumbers = function() {
                                webviewService.showNumbers();
                     
                                };
                
                  var repeater = null;
                    
                  $scope.show = function(){
                    console.log('show function');
                    webviewService.showNumbers();
                    repeater = setInterval(showNumbers,1000);
                     
                  };
    
                var recognition = new webkitSpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.start();
                                   
                // on Start
                recognition.onstart = function() {
                      
                    $scope.$apply(function () {
                         $scope.micStatus = "on";
                      });
                    console.log('starting webkitSpeechRecognition: ' +  new Date().toString('yyyy-MM-dd') );
                     
                }; // end start
          
                
               // on Error
               recognition.onerror = function(event) {
                   
                   
                    if (event.error == 'no-speech') {
                        
                        $scope.$apply(function () {
                                    $scope.micStatus = "off";
                                    $scope.speechInput = "Listening...";
                              });
                              
                        console.log('error - no speech');}
                    if (event.error == 'audio-capture') { 
                         $scope.$apply(function () {
                                    $scope.micStatus = "off";
                                    $scope.speechInput = "Check microphone";
                              });
                        console.log('error - audio-capture');}
                    if (event.error == 'not-allowed'){ 
                         $scope.$apply(function () {
                                    $scope.micStatus = "off";
                                    $scope.speechInput = "Check microphone";
                              });
                        console.log('error - audio-capture');}  
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
                        
                        $scope.$apply(function () {
                               $scope.speechInput = event.results[i][0].transcript;
                        });
        
                      console.log(event.results[i][0].transcript);
                        
                      // call a service which will determine what action to take.
                      var speechInput = event.results[i][0].transcript;     
                      var action = commandService.getAction(speechInput,$scope.pageLinks,$scope.url,$scope.niki);
                        
                      
                      switch(action.commandText)
                        {
                            case "number":
                                webviewService.triggerLinkClick(action.number);
                                break;
                            case "unknown":
                                action.url = htmlService.getURL(action.url);
                                webviewService.navigateTo(action.url);
                                break;
                            case "shownumbers":
                               webviewService.showNumbers();
                               repeater = setInterval(showNumbers,1000);
                                $scope.$apply(function () {
                                    $scope.numbersStatus = "on";
                                  });
                              break;
                            case "hidenumbers":
                                clearInterval(repeater);
                                webviewService.hideNumbers();
                                $scope.$apply(function () {
                                    $scope.numbersStatus = "off";
                                  });
                              break;
                            case "down":
                                webviewService.scrollDown();
                              break;
                             case "back":
                                webviewService.goBack();
                              break;
                            case "up":
                                webviewService.scrollUp();
                              break;
                            case "goto":   
                                 action.url = htmlService.getURL(action.url);
                                 webviewService.navigateTo(action.url);
                                 $scope.$apply(function () {
                                    $scope.showStartScreen = false;
                                  });
                                 break;   
                            case "search":
                                 webviewService.navigateTo(action.url);   
                                 $scope.$apply(function () {
                                    $scope.showStartScreen = false;
                                  });
                                 break;
                            case "help":
                                $scope.$apply(function () {
                                    $scope.showStartScreen = true;
                                });
                                break;
                            case "nikion":
                                $scope.$apply(function () {
                                    $scope.niki = "on";
                                });
                                break;
                             case "nikioff":
                                $scope.$apply(function () {
                                    $scope.niki = "off";
                                });
                                break;
                            default:
                             //
                        }
                    
                      console.log(action);
                        
                    } else {
                        $scope.$apply(function () {
                               $scope.speechInput = event.results[i][0].transcript;
                        });
                      console.log(event.results[i][0].transcript);
                    }
                  }
                };// end on result
            } ;
                
            $scope.init();
            $scope.show();
  }]);

