import React, { useState, Fragment } from 'react';
import './App.css';

var mqtt    = require('mqtt');
var options = {
	protocol: 'mqtts',
	// clientId uniquely identifies client
	// choose any string you wish
	clientId: 'justcoba177' 	
};
var client  = mqtt.connect('mqtt://test.mosquitto.org:8081', options);

client.subscribe('justcoba177');

function App() {
  var note;
  client.on('message', function (topic, message) {
    note = message.toString();
    // Updates React state with message 
    setMesg(note);
    console.log(topic,note.includes("suhu"));
    // client.end();
    });

  // Sets default React state 
  const [mesg, setMesg] = useState("noting");

  function matikan(){
    client.publish("justcoba177","0")
    // console.log("berhasil")
  }

  function hidupkan(){
    client.publish("justcoba177","1")
  }

  return (
    <div className="App">

    {/* <p>The message is: {mesg.includes("c")==false?mesg:""}</p> */}
    <p>suhu : {mesg.includes("c")?mesg:""}</p>
    <button onClick={hidupkan}>On</button>
    <button onClick={matikan} >Off</button>

		</div>
  );
}

export default App;
