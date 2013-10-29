'use strict';


/* Link Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.htmlService', []).
  value('htmlService', {
    
        getAllLinks: function(html) {

            html = html.replace(/<img[^>]*>/g,"");
            html = $.parseHTML( html ) 
                      
           return $(html).find( "a" );
    }
  }).
  value('version', '0.1');



