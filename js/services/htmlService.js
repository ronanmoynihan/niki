'use strict';


/* Link Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.htmlService', []).
  value('htmlService', {
    
        getAllLinks: function(html) {
            
            var doc = document.implementation.createHTMLDocument
            

            html = html.replace(/<img[^>]*>/g,"");
            var doc = document.implementation.createHTMLDocument();
            html = html.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0];
            var doc1 = (new DOMParser).parseFromString(html);
            
            doc.body.innerHTML = html;
            console.log(doc.links);
            html = $.parseHTML( html );
            
            console.log( $('a', html));
         
            
            //$("content").html(html);

           return $(html).find( "a" );
    }
  }).
  value('version', '0.1');



