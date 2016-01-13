

function setup_proxy(server_list){
  //console.log("execute setup_proxy func");
  setup_pac_data(server_list);
}

function generateRandomIdx(length){
  return Math.floor((Math.random()*length)+1);
}

function ping(ip, port, callback){
  if(!this.inUse){
    this.status = 'unchecked';
    this.inUse = true;
    this.callback = callback;
    this.ip = ip;
    this.port = port;
    var _that = this;

    this.img = new Image();
    this.img.onload = function(){
      _that.inUse = false;
      _that.callback('responded');

    };
    this.img.onerror = function(e){
      if(_that.inUse){
        _that.inUse = false;
        _that.callback('responded', e);
      }

    };
    this.start = new Date().getTime();
    this.img.src = "http://"+ip;
    this.timer = setTimeout(function(){
          if(_that.inUse){
            _that.inUse = false;
            _that.callback('timeout');
          }
        }, 1500);
  }
}



function testServerConn(server_list)
{

  // test first 5 servers first, 
  // most cases, we will find 2 from these 5 servers
  for(var i=0; i < 5; i++)
  {
    new ping(server_list[i].ip, function(stat,e){
      if(stat === 'responded'){
        //console.log(this.ip+"--responded");
        good_servers.push(this.ip);
        // 2 servers is enough
        if(good_servers.length >= 2)
        {
          flag0 = true;
        }
      }
    });
  }
}

function setup_pac_file(server_ip)
{
  var pac_server_addr = 'PROXY '+server_ip;
  //pac_server_addr = 'PROXY 219.141.189.236:80; ';

  pac_server_addr += '; DIRECT';
  //console.log(pac_server_addr);
  var pac_data = "function FindProxyForURL(url, host) {\n"+
                 "  if(shExpMatch(host, '*.163.com')||shExpMatch(host, '*.126.net')||shExpMatch(host, '*.qq.com'))\n" +
                 "    return '"+pac_server_addr+"';\n" +
                 "  return 'DIRECT';\n" +
                 "}";

  //console.log(pac_data);
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

function setup_pac_data(server_list){
  //console.log("enter setup_pac_data func");
 
  // from http://pac.unblockcn.com
  //var pac_server_addr = 'PROXY 203.88.160.145:80; ';// = 'PROXY 101.226.249.237:80; '+'DIRECT';
  //var pac_server_addr = '';
  //var index = [];
  //var ridx = generateRandomIdx(server_list.length);
  //index.push(ridx);
  //var tmp = generateRandomIdx(server_list.length);
  //if(ridx != tmp){
  //  ridx = tmp;
  //  index.push(ridx);
  //}
  //tmp = generateRandomIdx(server_list.length);
  //if(ridx != tmp){
  //  ridx = tmp;
  //  index.push(ridx);
  //}
  //console.log(server_list[0].ip+":"+server_list[0].port);
  //for(var i=0; i < server_list.length; i++){
   // new ping("120.198.236.12",  function(stat, e){
      //console.log(server_list[i].ip)
   //   console.log(stat);
   // });
  //}
  

  /*
   * ONLY TEST the Fastest server
   * */
  new ping(server_list[0].ip, server_list[0].port, function(stat,e){
    // check if this server is healthy
    if(stat === 'responded'){
      setup_pac_file(this.ip+":"+this.port);  
    }
  });
  //for(var i = 0; i < index.length; i++)
  //{
  //  pac_server_addr += 'PROXY ' 
  //                     + server_list[index[i]].ip 
  //                     + ':' 
  //                     + server_list[index[i]].port 
  //                     + '; ';
  //}
}
