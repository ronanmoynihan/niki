'use strict';


/* Webview Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.webviewService', []).
  value('webviewService', {
    
        showNumbers: function() {
            
             var webview = document.querySelector('webview');
                       
             for (var i=0;i<500;i++)
                        { 
                             webview.executeScript({code: "try{document.links[" + i + "].innerHTML+='<span style=color:#FF3A89;font-size:small;background-color:#C8FF00>" + i + "</span>' }catch(err){}"});
                            
                            // webview.executeScript({code: "document.links[" + i + "].innerHTML+='.' + " + i.toString()});
                            //   webview.executeScript({code: "document.links[" + i + "].setAttribute('data-hint','" + i + "')"});   
                            //   webview.executeScript({code: "document.links[" + i + "].className+= ' ' + 'hint--right     hint--always hint--success'"});
                        }
            
            //  document.querySelector('webview').insertCSS({file:"hint.css"},function(){console.log('css inserted');});
            //  webview.executeScript({code: " document.getElementById('google-search-searchterm').value = 'dd'"}); 
            //  webview.executeScript({code: "document.links[5].click()"});
                
        },
      
      
      triggerLinkClick: function(linkNumber){    
             var webview = document.querySelector('webview');
             webview.executeScript({code: "document.links[" + linkNumber+ "].click()"});     
      }
      
      
  }).
  value('version', '0.1');
