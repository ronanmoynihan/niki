'use strict';

/* Directives */


/*angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);*/

angular.module('myApp.directives', []).
directive('myIframe',[ function(){
 var linkFn = function(scope, element, attrs) {
       
        element.find('site').bind('load', function (event) {
          event.target.contentWindow.scrollTo(0,400);
           alert('loaded');
        });
    };
                                  
   }]);

    //    var str = document.getElementById('site').contentWindow.document.body.getElementsByTagName('voicelinks')[0].innerHTML
    //   var json = JSON.stringify(eval("(" + str + ")"));


/*
angular.module('directives.iFrame', []).
directive('myIframe', function(){
    var linkFn = function(scope, element, attrs) {
        element.find('site').bind('load', function (event) {
          event.target.contentWindow.scrollTo(0,400);
        });
    };
   
  });
  */
