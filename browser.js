

window.onresize = doLayout;
var isLoading = false;

onload = function() {

  var webview = document.querySelector('webview');
  doLayout();

 /* 
    webview.back();
    webview.forward();
    navigateTo('http://www.google.com/');
    webview.stop();
    webview.reload();
    webview.terminate();

 */

  webview.addEventListener('exit', handleExit);
  webview.addEventListener('loadstart', handleLoadStart);
  webview.addEventListener('loadstop', handleLoadStop);
  webview.addEventListener('loadabort', handleLoadAbort);
  webview.addEventListener('loadredirect', handleLoadRedirect);
  webview.addEventListener('loadcommit', handleLoadCommit);
};


function navigateTo(url) {
  resetExitedState();
  document.querySelector('webview').src = url;  
}

function doLayout() {
  var webview = document.querySelector('webview');
  var controls = document.querySelector('#controls');
  var controlsHeight = controls.offsetHeight;
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';

}

function handleExit(event) {
  console.log(event.type);
  document.body.classList.add('exited');
  if (event.type == 'abnormal') {
    document.body.classList.add('crashed');
  } else if (event.type == 'killed') {
    document.body.classList.add('killed');
  }
}

function resetExitedState() {
  document.body.classList.remove('exited');
  document.body.classList.remove('crashed');
  document.body.classList.remove('killed');
}

function handleLoadCommit(event) {
  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }

  //document.querySelector('#location').value = event.url;
  
    // set the scope url here.
  console.log(event.url);    
    
  //  webview.executeScript({ code: "document.body.scrollTop += 100" });
 
}

function handleLoadStart(event) {
  document.body.classList.add('loading');
  isLoading = true;

  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }

 // document.querySelector('#location').value = event.url;
}

function handleLoadStop(event) {
  // We don't remove the loading class immediately, instead we let the animation
  // finish, so that the spinner doesn't jerkily reset back to the 0 position.
  isLoading = false;

}

function handleLoadAbort(event) {
  console.log('oadAbort');
  console.log('  url: ' + event.url);
  console.log('  isTopLevel: ' + event.isTopLevel);
  console.log('  type: ' + event.type);
}

function handleLoadRedirect(event) {
  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }

 // document.querySelector('#location').value = event.newUrl;
}


