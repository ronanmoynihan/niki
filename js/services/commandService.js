'use strict';


/* Command Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.commandService', []).
  value('commandService', {
    
    getAction: function(speechInput,pageLinks) {
        
        var action = {
                type: "",
                url: "",
                number: "",
                commandText: ""
            }
        
        // 1 - Number
        action.type = "number";
        action.number = speechInput.trim();
        
        action.type = "command";
        action.commandText = "GO";
        
        return action;

        // 1. check if the input is a number. if so get the mapped href
        // return pageLinks[speechInput];
        
        // 2. compare input to known commands i.e go, down, up, show numbers;
        
        // 3. do a fuzzy string lookup against the text value of all links
        
        // 4. if still no match, return no action found for input
        
      
    } // end getAction
      
      
    doAction = function(webviewService){
      
      
    }
      
      
      
      
      
  }).
  value('version', '0.1');
