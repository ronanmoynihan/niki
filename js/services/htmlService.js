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
    }
      
    
  }).
  value('version', '0.1');



