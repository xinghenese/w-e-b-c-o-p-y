/**
 * Created by Administrator on 2015/5/14.
 */
var socket = new WebSocket("ws://192.168.0.110:8080/liao");
socket.onclose = function() { console.log("Connection closed."); };
socket.onerror = function (evt) { console.log("error:"+evt.data); };
socket.onmessage = function(event){
  console.log(event.data);
};
socket.onopen = function(){
  console.log('Connect');
  socket.send("{\"HSK\":{\"pbk\":\"e6qkw+Klh2D6ChthFF+cgfl+yG8huHgfPwspUokwerdlUPJTjGjDGC1SrlFKYqHvyWCVk1h2xp3fm0mnFG5kvRk4uut7OdFXzjHsd8Db7jdpQypj8w2PBbrceJtOTHwdM5Or0qa2wKF2E7UUhSnxwqo0eVjhRNAXnBWgxJH9N/U=\"}}");
};
