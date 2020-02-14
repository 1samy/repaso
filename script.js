
alert('bienvenido');
var etiqueta;
function onloadFcn(){
	etiqueta=document.getElementById("led");
	etiqueta.innerHTML="led ";
}
 // Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("tailor.cloudmqtt.com",30117, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName:"snljwmcd",
    password:"PH1pCjFgU8m8",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
  topic_rx="test";
  topic_tx="led"
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
	
    client.subscribe(topic_rx);
    message = new Paho.MQTT.Message("hola");
    message.destinationName = topic_tx;
    	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("nuevo mensaje:"+message.payloadString);
	
		accion(message.payloadString);
  }
  
    // called when a message arrives
  function sendMessage(msg) {
    message = new Paho.MQTT.Message(msg);
    message.destinationName = topic_tx;
    client.send(message);
	
  }

    // called when a message arrives
  function led_on() {
	sendMessage('led=1')
	//var prueba = "LED PRENDIDO";
	//document.write(prueba);	
	var Resultado1;
	Resultado1="PRENDIDO";
	document.getElementById('res').value=Resultado1;
	console.log(res)
  }
  function led_off() {
	sendMessage('led=0')
	//var prueba = "LED APAGADO";
	//document.write(prueba);	
	var Resultado2;
	Resultado2="APAGADO";
	document.getElementById('res').value=Resultado2;
	console.log(res)
  }
  
  
 
  
  function accion(msg){
mensaje=msg.split('=');
    if(mensaje[0]=='i')
        document.getElementById('sensor_i').innerHTML=mensaje[1];
    if(mensaje[0]=='p')
        document.getElementById('sensor_p').innerHTML=mensaje[1];
    if(mensaje[0]=='l')
        document.getElementById('sensor_l').innerHTML=mensaje[1];
      
		
  }
  