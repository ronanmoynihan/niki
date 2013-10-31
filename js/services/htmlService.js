'use strict';


/* Link Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.htmlService', []).
  value('htmlService', {
    
        getAllLinks: function(html) {
            
            var doc = document.implementation.createHTMLDocument
            
            // Estimate links as # of a's plus 100 ??????
            // Not sure why this count is different to document.links
            console.log('counting links');
            var numberOfLinks = html.match(/<a/g).length;
            var estimate = numberOfLinks + 100; 
            console.log('Estimated number of links is: ' + estimate);  
            //$scope.numberOfLinks = estimate;
            

            html = html.replace(/<img[^>]*>/g,"");
            var doc = document.implementation.createHTMLDocument();
            html = html.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0];
            var doc1 = (new DOMParser).parseFromString(html,'text/html');
            
            doc.body.innerHTML = html;
            console.log(doc.links);
            html = $.parseHTML( html );
            
            console.log( $('a', html));
         
            
            //$("content").html(html);

           return $(html).find( "a" );
    }
  }).
  value('version', '0.1');



