
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

function isMatchQQMusicDomain(theUrl){
  var testUrl = 'y.qq.com';
  if(theUrl.indexOf(testUrl) !== -1)
  {
    return true;
  }else{
    return false;
  }
}

function setupProxy(){
  //console.log("start to setup proxy for Netease music");
  getServerAddr(function(server_list){
    //for(var i = 0; i < server_list.length; i++)
    //{
    //  console.log(server_list[i]);
    //}
    setup_proxy(server_list);
    
  });
}

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


/* When each time open netease website or qq music website
* update the proxy server, and reset PAC file.
*/
document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(curUrl){
    //console.log(curUrl);  
    if(isMatchNEMusicDomain(curUrl) || isMatchQQMusicDomain(curUrl)){
      //console.log("call setup proxy from addEventListener")
      setupProxy();
    }else{
      //console.log("false");
    }
    
  });
});


// set up a pac file when plugin lanched
setupProxy();
NEPlugin_Version = '2.0';
