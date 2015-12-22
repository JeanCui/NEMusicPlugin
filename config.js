
/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs){
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

function isMatchNEMusicDomain(theUrl){
  var testUrl = 'music.163.com';
  if(theUrl.indexOf(testUrl) !== -1)
  {
    return true;
  }else{
    return false;
  }

}

function setupProxy(){
  console.log("start to setup proxy for Netease music");
  getServerAddr(function(server_list){
    //for(var i = 0; i < server_list.length; i++)
    //{
    //  console.log(server_list[i]);
    //}
    setup_proxy(server_list);
    
  });
}


//chrome.management.onUninstalled.addListener(function(id){
//  if(id == )
  
//});

function change_plugin_icon(option){
  switch(option){
    case 'enable':
      chrome.browserAction.setIcon({
        path:"icon.png"
      });
      chrome.browserAction.setTitile({title: 'unblock netease is on'});
      break;
    case 'disable':
      chrome.browserAction.setIcon({
        path:"greyicon.png"
      });
      chrome.browserAction.setTitile({title: 'unblock netease is off'});
      break;
  }
}


// set up a pac file when plugin lanched
//console.log('plugin lanched');
setupProxy();
NEPlugin_Version = '1.0';

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(curUrl){
    //console.log(curUrl);  
    if(isMatchNEMusicDomain(curUrl)){
      //chrome.browserAction.setIcon({
      //  path:"icon.png"
      //});
      //change_plugin_icon('enable');
      setupProxy();
    }else{

      //chrome.browserAction.setIcon({
      //  path:"greyicon.png"
      //});
      //change_plugin_icon('disable');
      console.log("false");
    }
    
  });
});