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
                 
                var html = xhr.responseText; 
                html = html.replace(/<img[^>]*>/g,"");
                html = $.parseHTML( html ) 
            
                console.log($(html).find( "a" ));   
               
            }
        }
        xhr.send();
       
           
      
    }
  }).
  value('version', '0.1');



