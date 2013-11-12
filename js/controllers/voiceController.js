'use strict';

/* Controllers */

angular.module('controllers.voiceController', []).
 controller('voiceController', ['$scope','$http','$timeout','speechService','htmlService','commandService','webviewService',
            function($scope,$http,$timeout, speechService, htmlService,commandService, webviewService) {
                
                
              var showNumbers = function() {
                                webviewService.showNumbers();
                     
                                };
                
              var repeater = null;
                
              $scope.show = function(){
                console.log('show function');
                webviewService.showNumbers();
                repeater = setInterval(showNumbers,1000);
                 
              };
                
              
              $scope.go = function(){

                $scope.showStartScreen = false;

                console.log('go function');
                var url = $scope.url;
                if(url.indexOf('http://')==-1){
                    url = "http://" + url;
                }
 
                webviewService.navigateTo(url);
                var promise = $http.get(url).then(function (response) {
                            $scope.pageLinks = htmlService.getAllLinks(response.data);
                            console.log($scope.pageLinks);
                    
                              });
                };
              
            $scope.init = function(){
                
                $scope.showStartScreen = true;
                $scope.micStatus = "off";
                $scope.numbersStatus = "on";
                
                $scope.microphoneurl = "css/images/microphone.gif";
                console.log('init function');
                $scope.speechInput = "Listening...";
                  
                webviewService.initializeWebview();
    
                var recognition = new webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
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
                                    $scope.speechInput = "Listening";
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
                      var action = commandService.getAction(speechInput,$scope.pageLinks,$scope.url);
                        
                      // Execute the Action    
                      if(action.type=="number"){
                         webviewService.triggerLinkClick(action.number);
                         var promise = $http.get($scope.url).then(function (response) {
                                          //webviewService.showNumbers(); 
                                  });
                      }
                        
                      switch(action.commandText)
                        {
                            case "unknown":
                                webviewService.navigateTo("http://"+action.url);
                                break;
                            case "shownumbers":
                               webviewService.showNumbers();
                               repeater = setInterval(showNumbers,1000);
                              break;
                            case "hidenumbers":
                                clearInterval(repeater);
                                webviewService.hideNumbers();
                              break;
                            case "down":
                                webviewService.scrollDown();
                              break;
                             case "back":
                                webviewService.goBack();;
                              break;
                            case "up":
                                webviewService.scrollUp();
                             //
                              break;
                            case "go":
                                
                                 webviewService.navigateTo($scope.url);
                                 var promise = $http.get($scope.url).then(function (response) {
                                         // webviewService.showNumbers(); 
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

