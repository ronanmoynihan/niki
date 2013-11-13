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



