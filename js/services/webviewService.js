'use strict';



var isLoading = false;
var webview = document.querySelector('webview');


/* Webview Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.webviewService', []).
  value('webviewService', {
      
      
        isWebviewLoading : function(){
            
            try{
                webview.executeScript({code: ""}); 
                return false;
            }
            catch(ex) {
                return true;
            }
           
        },
      
        hideNumbers: function(){ 
            
             webview.executeScript({code: "hideNumbers();"});
        },
    
        showNumbers: function() {
            
             webview.executeScript({code: "showNumbers();"});              
        },
      
      
      triggerLinkClick: function(linkNumber){    
            // var webview = document.querySelector('webview');
             webview.executeScript({code: "document.links[" + linkNumber+ "].click()"});     
      },
      
      scrollDown: function(){  
        webview.executeScript({ code: "var dfd = 'test test';" });
        webview.executeScript({ code: "console.log(dfd);" });
        webview.executeScript({ code: "document.body.scrollTop += 700" });   
      },
      
      
      scrollUp: function(){  
        webview.executeScript({ code: "document.body.scrollTop -= 700" });   
      },
      
     navigateTo: function (url) {
         isLoading = true;
        document.querySelector('webview').src = url;  
     },
      
    initializeWebview: function () {
        

      
      // var webview = document.querySelector('webview');
          var controls = document.querySelector('#controls');
          var controlsHeight = controls.offsetHeight;
          var windowWidth = document.documentElement.clientWidth;
          var windowHeight = document.documentElement.clientHeight;
          var webviewWidth = windowWidth;
          var webviewHeight = windowHeight - controlsHeight;
        
          webview.style.width = webviewWidth + 'px';
          webview.style.height = webviewHeight + 'px';
        
    //  var webview = document.querySelector('webview');
        
        
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
            
              //document.querySelector('#location').value = event.url;

              console.log(event.url);
              
              if(document.querySelector('#showNumbers').innerHTML=="on"){
              document.querySelector('webview').insertCSS({file:"css/inject.css"},function(){console.log('css inserted');});
              for (var i=0;i<500;i++)
                        { 

                        }
              }
            
              document.querySelector('webview').executeScript({file: "js/inject.js"});
              //document.querySelector('webview').executeScript({code: "showNumbers();"});
            //  webview.executeScript({code: " document.getElementById('google-search-searchterm').value = 'dd'"});                
        
        }
          
          var handleLoadStart = function(event) {
                  document.body.classList.add('loading');
                  isLoading = true;
                
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
          isLoading = false;
        
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
            
             // document.querySelector('#location').value = event.newUrl;
            }
        

      webview.addEventListener('exit', handleExit);
      webview.addEventListener('loadstart', handleLoadStart);
      webview.addEventListener('loadstop', handleLoadStop);
      webview.addEventListener('loadabort', handleLoadAbort);
      webview.addEventListener('loadredirect', handleLoadRedirect);
      webview.addEventListener('loadcommit', handleLoadCommit);
     },
      

      
  }).
  value('version', '0.1');

