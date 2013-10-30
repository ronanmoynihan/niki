'use strict';

/* Controllers */

angular.module('controllers.mainController', []).
 controller('mainController', ['$scope','$http','speechService','htmlService','commandService',
            function($scope,$http, speechService, htmlService,commandService) {
                
            var url = $scope.url;
                
            var promise = $http.get(url).then(function (response) {
          
                    $scope.pageLinks = htmlService.getAllLinks(response.data);
                    console.log($scope.pageLinks[115]);
                
                    console.log($scope.pageLinks);
                
                    var webview = document.querySelector('webview');
                   
                    //webview.executeScript({code: " document.getElementById('google-search-searchterm').value = 'dd'"});
               
                    // this will cause an error as 500 will be too many
                    for (var i=0;i<500;i++)
                    { 
                         webview.executeScript({code: "try{document.links[" + i + "].innerHTML+='<span style=color:red;font-size:small;background-color:lightblue>" + i + "</span>' }catch(err){}"});
                        
                        // webview.executeScript({code: "document.links[" + i + "].innerHTML+='.' + " + i.toString()});
                        //   webview.executeScript({code: "document.links[" + i + "].setAttribute('data-hint','" + i + "')"});   
                        //   webview.executeScript({code: "document.links[" + i + "].className+= ' ' + 'hint--right     hint--always hint--success'"});
                    }
            
                    document.querySelector('webview').insertCSS({file:"hint.css"},function(){console.log('css inserted');});

                    // webview.executeScript({code: "document.links[5].click()"});
                
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
                              webview.executeScript({code: "document.links[" + action.number + "].click()"});
                          }
                        
                          console.log(action);
                            
                        } else {
               
                          console.log(event.results[i][0].transcript);
                        }
                      }
                    };// end on result
                
                
                });

     
  }]);

