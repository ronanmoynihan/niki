'use strict';


/* Speech Service */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services.speechService', []).
  value('speechService', {
    
    startSpeech: function() {

        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.start();
                   
        // on Start
        recognition.onstart = function() {
            console.log('starting webkitSpeechRecognition: ' +  new Date().toString('yyyy-MM-dd') );
        }; // end start
  
        
       // on Error
       recognition.onerror = function(event) {
            if (event.error == 'no-speech') { console.log('error - no speech');}
            if (event.error == 'audio-capture') { console.log('error - audio-capture');}
            if (event.error == 'not-allowed'){ console.log('error - audio-capture');}       
        }; // end error
  
        
        // on end
        recognition.onend = function() {
            var date = new Date(event.timeStamp);
            console.log('end webkitSpeechRecognition: ' + date.toString('yyyy-MM-dd') );  
    
            recognition.start();
        } // end on end
      
        // on result
        recognition.onresult = function(event) {
        
          var interim_transcript = '';
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {

              console.log(event.results[i][0].transcript);
            } else {
   
              console.log(event.results[i][0].transcript);
            }
          }
        };// end on result
        
      
    } // end Speech
  }).
  value('version', '0.1');
