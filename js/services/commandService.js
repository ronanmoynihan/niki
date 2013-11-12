'use strict';


/* Command Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.commandService', []).
  value('commandService', {
    
    getAction: function(speechInput,pageLinks,url) {
        
        speechInput = speechInput.trim().toLowerCase();
             
        
        // scroll of,scrubs = scroll up
        
        var action = {
                type: "",
                url: "",
                number: "",
                commandText: ""
            }    
        
        switch(speechInput){
                
            // case [begins with google]
                
            case "goal":
            case "go":
                action.type = "command";
                action.commandText = "go";
                break;
            case "number":
                action.type = "number";
                action.number = speechInput;
                break;
            case "numbers on":
                action.commandText = "shownumbers";
                break;   
             case "numbers off":
             case "numbers of":
                action.commandText = "hidenumbers";
                break;   
            case "scroll up":
                action.commandText = "up";
                break;   
             case "scroll down":
                action.commandText = "down";
                break;           
            default:
                if(isNaN(speechInput)){
                    action.commandText = "unknown";
                    
                                var options = {
                                  keys: ['text'],   // keys to search in
                                  id: 'url'                     // return a list of identifiers only
                                  //threshold: 0.0
                                }
                            var f = new Fuse(pageLinks, options);
                            var matchedURL = f.search(speechInput); 
                            
                            var finalURL;
                                    for(var m in matchedURL){
                                            if(matchedURL[m].indexOf('chrome'!=-1)){
                                                var slash = matchedURL[m].indexOf('/',19);
                                                var s = matchedURL[m].substring(slash);
                                                
                                               finalURL = url.match(/:\/\/(.[^/]+)/)[1] + s;
                                               break;
                                            }
                                            else{
                                                finalURL = matchedURL[m];
                                            }
                                    }
                    action.url = finalURL;
                    console.log("closest matched url: " + action.url);
                }
                else{
                 action.type = "number";
                 action.number = speechInput;
                }
                         
        }
        
        return action;

        // 1. check if the input is a number. if so get the mapped href
        // return pageLinks[speechInput];
        
        // 2. compare input to known commands i.e go, down, up, show numbers;
        
        // 3. do a fuzzy string lookup against the text value of all links
        
        // 4. if still no match, return no action found for input
        
      
    }, // end getAction
      
      
    doAction: function(webviewService,url,speechInput){
      
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
        
                  if(action.type=="number"){
                     webviewService.triggerLinkClick(action.number);
                  }
                    
                    switch(action.commandText)
                    {
                        case "SHOWNUMBERS":
                          webviewService.showNumbers();
                          break;
                        case "SCROLLDOWN":
                         //
                          break;
                                   
                        default:
                         //
                    }
            
            console.log("returning from doAction");
            return "done";
                
    }
  
      
  }).
  value('version', '0.1');
