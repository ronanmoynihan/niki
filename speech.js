
var recognizing = false;

if (!('webkitSpeechRecognition' in window)) {
    
} else {
    
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.start();
    
    $( "div" ).first().css( "background-color", "red" );
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.facebook.com", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            
            console.log(xhr.responseText);
            
        }
    }
    xhr.send();
}

recognition.onstart = function() {
    recognizing = true;
    console.log('starting: ' +  new Date().toString('yyyy-MM-dd') );
    
    };

recognition.onerror = function(event) {
    
    if (event.error == 'no-speech') {
        console.log('error - no speech');
    }
    if (event.error == 'audio-capture') {
        console.log('error - audio-capture');
    }
    if (event.error == 'not-allowed'){
        console.log(event.error);
    }
};

recognition.onend = function() {
    var date = new Date(event.timeStamp);
    console.log('end: ' + date.toString('yyyy-MM-dd') );
    
    recognition.start();
    
}

recognition.onresult = function(event) {
    
    var webview = document.querySelector('webview');
    
    webview.executeScript({ code: "document.body.bgColor = 'green'" });
    

    
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            
            
            console.log(event.results[i][0].transcript);
        } else {
            
            console.log(event.results[i][0].transcript);
        }
    }
     };


