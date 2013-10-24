'use strict';


/* Link Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.linkService', []).
  value('linkService', {
    
        getLinksForURL: function(url) {
          
            var recognizing = false;
            
             var xhr = new XMLHttpRequest();
             xhr.open("GET", url, true);
             xhr.onreadystatechange = function() {
             if (xhr.readyState == 4) {
                //console.log(xhr.responseText);   
                //document.querySelector('webview').src = xhr.responseText;
            }
        }
        xhr.send();
       
      
    }
  }).
  value('version', '0.1');



