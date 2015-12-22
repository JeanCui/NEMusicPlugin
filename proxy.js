

function setup_proxy(server_list){
  console.log("execute setup_proxy func");
  setup_pac_data(server_list);
}

function generateRandomIdx(length){
  return Math.floor((Math.random()*length)+1);
}

function setup_pac_data(server_list){
  console.log("enter setup_pac_data func");
  // from http://pac.unblockcn.com
  //var pac_server_addr = 'PROXY 203.88.160.145:80; ';// = 'PROXY 101.226.249.237:80; '+'DIRECT';
  var pac_server_addr = '';
  var index = [];
  var ridx = generateRandomIdx(server_list.length);
  index.push(ridx);
  var tmp = generateRandomIdx(server_list.length);
  if(ridx != tmp){
    ridx = tmp;
    index.push(ridx);
  }
  tmp = generateRandomIdx(server_list.length);
  if(ridx != tmp){
    ridx = tmp;
    index.push(ridx);
  }

  for(var i = 0; i < index.length; i++)
  {
    pac_server_addr += 'PROXY ' 
                       + server_list[index[i]].ip 
                       + ':' 
                       + server_list[index[i]].port 
                       + '; ';
  }
  pac_server_addr += 'DIRECT';
  //console.log(pac_server_addr);
  var pac_data = "function FindProxyForURL(url, host) {\n"+
                 "  if(shExpMatch(host, '*.163.com')||shExpMatch(host, '*.126.net'))\n" +
                 "    return '"+pac_server_addr+"';\n" +
                 "  return 'DIRECT';\n" +
                 "}";

  console.log(pac_data);
  var proxy_config = {
    mode: 'pac_script',
    pacScript: {
      data: pac_data
    }
  };

  chrome.proxy.settings.set(
      {
        value: proxy_config,
        scope: 'regular'
      },
      function(){}
      );
}
