/*
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

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

/*
 * Test proxy server connection,
 * if ping succeeded, setup pac file.
 */
function test_server(server_list){
  //console.log("enter setup_pac_data func");
 
  /*
   * ONLY TEST the Fastest server
   */
  new ping(server_list[0].ip, server_list[0].port, function(stat,e){
    // check if this server is healthy
    if(stat === 'responded'){
      setup_pac_file(this.ip+":"+this.port);  
    }
  });
}

function setup_proxy(server_list){
  //console.log("execute setup_proxy func");
  test_server(server_list);
}
