'use strict';


/* Speech Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.speechService', []).
  value('speechService', {
    
    startSpeech: function() {
      
        var recognizing = false;
        
         if (!('webkitSpeechRecognition' in window)) {
                
                // warn user they will need to update their browser.
              } else {
              
                var recognition = new webkitSpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.start();
                   
              }
      
       recognition.onstart = function() {
          recognizing = true;
         console.log('starting: ' +  new Date().toString('yyyy-MM-dd') );
           
            var xhr = new XMLHttpRequest();
             xhr.open("GET", "http://www.rte.ie", true);
             xhr.onreadystatechange = function() {
             if (xhr.readyState == 4) {
              //  console.log(xhr.responseText);   
               // document.querySelector('webview').src ="data:text/html," + xhr.responseText;
              //   var c = "document.write(" + xhr.responseText + ")"
                   
            }
        }
        xhr.send();
          
           // webview.executeScript({ code: "document.body.scrollTop += 100" });
 
 //document.querySelector('webview').executeScript({code: "document.links[0].innerHTML='booyah';document.links[1].innerHTML='booyah'"});
    
     var webview = document.querySelector('webview');
    
    for (var i=0;i<100;i++)
    { 
        
      webview.executeScript({code: "document.links[" + i + "].innerHTML+='.' + " + i.toString()});

//   webview.executeScript({code: "document.links[" + i + "].setAttribute('data-hint','" + i + "')"});
    
 //   webview.executeScript({code: "document.links[" + i + "].className+= ' ' + 'hint--right hint--always hint--success'"});
    }
    
    
    
    document.querySelector('webview').insertCSS({file:"hint.css"},function(){console.log('css inserted');});



       };
  
       recognition.onerror = function(event) {

            if (event.error == 'no-speech') {
              console.log('error - no speech');
            }
            if (event.error == 'audio-capture') {
             console.log('error - audio-capture');
            }
         if (event.error == 'not-allowed'){
              console.log('error - audio-capture');
            }
      };
  
      recognition.onend = function() {
        var date = new Date(event.timeStamp);
        console.log('end: ' + date.toString('yyyy-MM-dd') );  

        recognition.start();
        // document.querySelector('webview').src = 'http://www.rte.ie';
          
         

        }
      
      recognition.onresult = function(event) {
        
          var interim_transcript = '';
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {

              console.log(event.results[i][0].transcript);
            } else {
   
              console.log(event.results[i][0].transcript);
            }
          }
      };
      // end Speech
    }
  }).
  value('version', '0.1');