'use strict';

var webview = document.querySelector('webview');
window.onresize = doLayout;

/* Webview Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.webviewService', []).
  value('webviewService', {
      
      
        hideNumbers: function(){ 
            
             webview.executeScript({code: "hideNumbers();"});
        },
    
        showNumbers: function() {
            
            try{
             webview.executeScript({code: "showNumbers();"});    
            }
            catch(ex){
             // swallow ex   
            }
        },
      
      
      triggerLinkClick: function(linkNumber){    
             webview.executeScript({code: "document.links[" + linkNumber+ "].click()"});     
      },
      
      scrollDown: function(){  
        webview.executeScript({ code: "smoothScroll('down');" });   
      },
      
      
      scrollUp: function(){  
        webview.executeScript({ code: "smoothScroll('up');" });   
      },
      
       goBack: function(){  
        webview.back();
      },
      
      getURL: function(){
          return webview.src;
      },
      
     navigateTo: function (url) {
        webview.src = url;  
     },
      
    initializeWebview: function () {

          var controls = document.querySelector('#controls');
          var controlsHeight = controls.offsetHeight;
          var windowWidth = document.documentElement.clientWidth;
          var windowHeight = document.documentElement.clientHeight;
          var webviewWidth = windowWidth;
          var webviewHeight = windowHeight - controlsHeight;
        
          webview.style.width = webviewWidth + 'px';
          webview.style.height = webviewHeight + 'px';  
        
          var handleExit = function(event) {
              console.log(event.type);
              document.body.classList.add('exited');
              if (event.type == 'abnormal') {
                document.body.classList.add('crashed');
              } else if (event.type == 'killed') {
                document.body.classList.add('killed');
              }
            }
      
            var resetExitedState = function() {
              document.body.classList.remove('exited');
              document.body.classList.remove('crashed');
              document.body.classList.remove('killed');
            }
        
            var handleLoadCommit = function (event) {
              console.log('committed');
              resetExitedState();
              if (!event.isTopLevel) {
                return;
            }
        
            console.log(event.url);

            document.querySelector('webview').insertCSS({file:"css/inject.css"},function(){console.log('css inserted');});
            document.querySelector('webview').executeScript({file: "js/inject.js"});
            document.querySelector('webview').executeScript({file: "js/scroll.js"});
            //  webview.executeScript({code: " document.getElementById('google-search-searchterm').value = 'dd'"}); 
                
            doLayout();
        
        }
          
          var handleLoadStart = function(event) {
                  document.body.classList.add('loading');
                
                  resetExitedState();
                  if (!event.isTopLevel) {
                    return;
                  }
                
                  document.querySelector('#location').value = event.url;
                }
          
         var handleLoadStop =  function(event) {
             console.log('handleLoadStop');
          // We don't remove the loading class immediately, instead we let the animation
          // finish, so that the spinner doesn't jerkily reset back to the 0 position.

        
        }
         
         
          var  handleLoadAbort = function handleLoadAbort(event) {
              console.log('oadAbort');
              console.log('  url: ' + event.url);
              console.log('  isTopLevel: ' + event.isTopLevel);
              console.log('  type: ' + event.type);
            }
          
          var  handleLoadRedirect = function (event) {
              resetExitedState();
              if (!event.isTopLevel) {
                return;
              }
            
              document.querySelector('#location').value = event.newUrl;
            }
        

      webview.addEventListener('exit', handleExit);
      webview.addEventListener('loadstart', handleLoadStart);
      webview.addEventListener('loadstop', handleLoadStop);
      webview.addEventListener('loadabort', handleLoadAbort);
      webview.addEventListener('loadredirect', handleLoadRedirect);
      webview.addEventListener('loadcommit', handleLoadCommit);
     }
      

      
  }).
  value('version', '0.1');


// Helper to resize layout.
function doLayout() {
   var controls = document.querySelector('#controls');
          var controlsHeight = controls.offsetHeight;
          var windowWidth = document.documentElement.clientWidth;
          var windowHeight = document.documentElement.clientHeight;
          var webviewWidth = windowWidth;
          var webviewHeight = windowHeight - controlsHeight;
        
          webview.style.width = webviewWidth + 'px';
          webview.style.height = webviewHeight + 'px';  
}
'use strict';


/* Command Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.commandService', []).
  value('commandService', {
    
    getAction: function(speechInput,pageLinks,url,nikiStatus) {
        
        speechInput = speechInput.trim().toLowerCase();
             
        var input = {
                text : speechInput,
                paramater : ""
        }
        
        /*Split input and paramaters
            1. Go to xxxx
            2. Search xxx
        */
        if (typeof String.prototype.startsWith != 'function') {
              // see below for better implementation!
              String.prototype.startsWith = function (str){
                return this.indexOf(str) == 0;
              };
            }
        
        if(input.text.startsWith('go to')){
           input.paramater = input.text.substr(5,input.text.length).trim();
           input.text = "go to";
           console.log(input.paramater);
        }
        if(input.text.startsWith('search')){
           input.paramater = input.text.substr(6,input.text.length).trim();
           input.text = "search";
           console.log(input.paramater);
        }
            
        
        var action = {
                url: "",
                number: "",
                commandText: ""
            }    
        
       
        switch(input.text){
                
            case "number":
                action.commandText = "number";
                action.number = speechInput;
                break;
            case "numbers on":
            case "number on":
                action.commandText = "shownumbers";
                break;   
             case "numbers off":
             case "numbers of":
             case "number off":
             case "number of":
                action.commandText = "hidenumbers";
                break;   
            case "scroll up":
            case "scott up":
            case "scroll of":
            case "grown up":
            case "skull":
                action.commandText = "up";
                break;   
             case "scroll down":
             case "school down":
             case "girl down":
                action.commandText = "down";
                break;    
             case "back":
             case "bach":
             case "black":
             case "pack":
             case "bike":
                action.commandText = "back";
                break;  
            case "go to":
                action.commandText = "goto";
                action.url = input.paramater;
                break;
            case "search":
                action.commandText = "search";
                action.url = "http://www.google.com/search?q=" + input.paramater;
                break;
            case "help":
                action.commandText = "help";
                break;
            case "nikki on":
                action.commandText = "nikion";
                nikiStatus = "on";
                break;
             case "nikki off":
             case "nikki of":
             case "nicki off":
             case "nicki of":
                action.commandText = "nikioff";
                break;
            case "noaction":
                action.commandText = "noaction";
                break;
            default:
                if(isNaN(speechInput) && pageLinks!=null){
                    action.commandText = "unknown";
                    
                                var options = {
                                  keys: ['text'],   // keys to search in
                                  id: 'url'                     // return a list of identifiers only
                                  //threshold: 0.0
                                }
                            var f = new Fuse(pageLinks, options);
                            // Fuse only works on strings less than 33.
                            var matchedURL = f.search(speechInput.substr(0,32)); 
                            
                            var finalURL;
                                    for(var m in matchedURL){
                                            if(matchedURL[m].indexOf('chrome'!=-1)){
                                                var slash = matchedURL[m].indexOf('/',19);
                                                var s = matchedURL[m].substring(slash);
                                                
                                               finalURL = url.match(/:\/\/(.[^/]+)/)[1] + s;
                                               break;
                                            }
                                            else{
                                                finalURL = matchedURL[m];
                                            }
                                    }
                    if(finalURL==null){
                        finalURL=url;
                        console.log('Did not find a fuzzy match');
                    }
                    action.url = finalURL;
                    console.log("closest matched url: " + action.url);
                }
                else{
                 action.commandText = "number";
                 action.number = speechInput;
                }
                         
        }
        
        if(nikiStatus=="off"){
            action.commandText = "noaction";
        }
        
        return action;

    } // end getAction
      
      
      
  }).
  value('version', '0.1');
'use strict';


/* Link Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.htmlService', []).
  value('htmlService', {
    
        getAllLinks: function(html) {
            
            html = html.replace(/<img[^>]*>/g,"");
            html = $.parseHTML( html );
            
            var links = [];
            var atags = $('a', html);
            
            for(var i in atags){
                 if(atags[i]!=null){
                    var plink = {
                        text: atags[i].innerText,
                        url: atags[i].href
                    }    
                    // console.log(atags[i].href);
                    links.push(plink);
                }
            }
         
            return links;
        },
      
      
       getURL: function(inputURL){
           
           var url = inputURL;
                    if(url.indexOf('http://')==-1 && url.indexOf('https://')==-1){
                        url = "http://" + url;
                    }
           
           return url;
       }
      
    
  }).
  value('version', '0.1');



'use strict';

var webview = document.querySelector('webview');
window.onresize = doLayout;

/* Webview Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.webviewService', []).
  value('webviewService', {
      
      
        hideNumbers: function(){ 
            
             webview.executeScript({code: "hideNumbers();"});
        },
    
        showNumbers: function() {
            
            try{
             webview.executeScript({code: "showNumbers();"});    
            }
            catch(ex){
             // swallow ex   
            }
        },
      
      
      triggerLinkClick: function(linkNumber){    
             webview.executeScript({code: "document.links[" + linkNumber+ "].click()"});     
      },
      
      scrollDown: function(){  
        webview.executeScript({ code: "smoothScroll('down');" });   
      },
      
      
      scrollUp: function(){  
        webview.executeScript({ code: "smoothScroll('up');" });   
      },
      
       goBack: function(){  
        webview.back();
      },
      
      getURL: function(){
          return webview.src;
      },
      
     navigateTo: function (url) {
        webview.src = url;  
     },
      
    initializeWebview: function () {

          var controls = document.querySelector('#controls');
          var controlsHeight = controls.offsetHeight;
          var windowWidth = document.documentElement.clientWidth;
          var windowHeight = document.documentElement.clientHeight;
          var webviewWidth = windowWidth;
          var webviewHeight = windowHeight - controlsHeight;
        
          webview.style.width = webviewWidth + 'px';
          webview.style.height = webviewHeight + 'px';  
        
          var handleExit = function(event) {
              console.log(event.type);
              document.body.classList.add('exited');
              if (event.type == 'abnormal') {
                document.body.classList.add('crashed');
              } else if (event.type == 'killed') {
                document.body.classList.add('killed');
              }
            }
      
            var resetExitedState = function() {
              document.body.classList.remove('exited');
              document.body.classList.remove('crashed');
              document.body.classList.remove('killed');
            }
        
            var handleLoadCommit = function (event) {
              console.log('committed');
              resetExitedState();
              if (!event.isTopLevel) {
                return;
            }
        
            console.log(event.url);

            document.querySelector('webview').insertCSS({file:"css/inject.css"},function(){console.log('css inserted');});
            document.querySelector('webview').executeScript({file: "js/inject.js"});
            document.querySelector('webview').executeScript({file: "js/scroll.js"});
            //  webview.executeScript({code: " document.getElementById('google-search-searchterm').value = 'dd'"}); 
                
            doLayout();
        
        }
          
          var handleLoadStart = function(event) {
                  document.body.classList.add('loading');
                
                  resetExitedState();
                  if (!event.isTopLevel) {
                    return;
                  }
                
                  document.querySelector('#location').value = event.url;
                }
          
         var handleLoadStop =  function(event) {
             console.log('handleLoadStop');
          // We don't remove the loading class immediately, instead we let the animation
          // finish, so that the spinner doesn't jerkily reset back to the 0 position.

        
        }
         
         
          var  handleLoadAbort = function handleLoadAbort(event) {
              console.log('oadAbort');
              console.log('  url: ' + event.url);
              console.log('  isTopLevel: ' + event.isTopLevel);
              console.log('  type: ' + event.type);
            }
          
          var  handleLoadRedirect = function (event) {
              resetExitedState();
              if (!event.isTopLevel) {
                return;
              }
            
              document.querySelector('#location').value = event.newUrl;
            }
        

      webview.addEventListener('exit', handleExit);
      webview.addEventListener('loadstart', handleLoadStart);
      webview.addEventListener('loadstop', handleLoadStop);
      webview.addEventListener('loadabort', handleLoadAbort);
      webview.addEventListener('loadredirect', handleLoadRedirect);
      webview.addEventListener('loadcommit', handleLoadCommit);
     }
      

      
  }).
  value('version', '0.1');


// Helper to resize layout.
function doLayout() {
   var controls = document.querySelector('#controls');
          var controlsHeight = controls.offsetHeight;
          var windowWidth = document.documentElement.clientWidth;
          var windowHeight = document.documentElement.clientHeight;
          var webviewWidth = windowWidth;
          var webviewHeight = windowHeight - controlsHeight;
        
          webview.style.width = webviewWidth + 'px';
          webview.style.height = webviewHeight + 'px';  
}
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

