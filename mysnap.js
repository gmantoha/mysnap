#! /usr/bin/env node
console.log('starting mqtt client')
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
  client.subscribe('roundtrip/in', function (err) {
    if (err) {
      console.log(err);
    }
  })
})

client.on('message', function (topic, message) {
  let data = JSON.parse(message.toString());
  let oneValue = data[0].values[0].value;
  let sum = 0;
  let mqttOut;

  for (let i = 0; i < data[0].values.length; i++){
    sum += parseInt( data[0].values[i].value, 10 );
  }

  mqttOut = Math.abs(sum / data[0].values.length);

  client.publish('roundtrip/out', mqttOut.toString());
})