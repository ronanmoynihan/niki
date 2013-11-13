'use strict';


/* Command Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.commandService', []).
  value('commandService', {
    
    getAction: function(speechInput,pageLinks,url) {
        
        speechInput = speechInput.trim().toLowerCase();
             
        var input = {
                text : speechInput,
                paramater : ""
        }
        
        /*Split input and paramaters
            1. Go to xxxx
            2. Search xxx
        */
        if (typeof String.prototype.startsWith != 'function') {
              // see below for better implementation!
              String.prototype.startsWith = function (str){
                return this.indexOf(str) == 0;
              };
            }
        
        if(input.text.startsWith('go to')){
           input.paramater = input.text.substr(5,input.text.length).trim();
           input.text = "go to";
           console.log(input.paramater);
        }
        if(input.text.startsWith('search')){
           input.paramater = input.text.substr(6,input.text.length).trim();
           input.text = "search";
           console.log(input.paramater);
        }
            
        
        var action = {
                url: "",
                number: "",
                commandText: ""
            }    
        
        switch(input.text){
                
            case "number":
                action.commandText = "number";
                action.number = speechInput;
                break;
            case "numbers on":
                action.commandText = "shownumbers";
                break;   
             case "numbers off":
             case "numbers of":
             case "number off":
             case "number of":
                action.commandText = "hidenumbers";
                break;   
            case "scroll up":
            case "scott up":
            case "scroll of":
            case "grown up":
                action.commandText = "up";
                break;   
             case "scroll down":
                action.commandText = "down";
                break;    
             case "back":
             case "bach":
             case "black":
             case "pack":
                action.commandText = "back";
                break;  
            case "go to":
                action.commandText = "goto";
                action.url = input.paramater;
                break;
            case "search":
                action.commandText = "search";
                action.url = "http://www.google.com/search?q=" + input.paramater;
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
                            // Fuse only works on strings less than 33.
                            var matchedURL = f.search(speechInput.substr(0,32)); 
                            
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
                    if(finalURL==null){
                        finalURL=url;
                        console.log('Did not find a fuzzy match');
                    }
                    action.url = finalURL;
                    console.log("closest matched url: " + action.url);
                }
                else{
                 action.commandText = "number";
                 action.number = speechInput;
                }
                         
        }
        
        return action;

    } // end getAction
      
      
      
  }).
  value('version', '0.1');
