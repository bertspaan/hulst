const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const Tasks = require("./tasks")

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {

    try {
      let m = JSON.parse(message)
      console.log('SERV_RECV', m)

      // taak update
      if (m.update) {

      }

    } catch (error) {
      console.log('ERROR maar niet erg', error)
    }
    console.log('received: %s', message);
  });

  ws.send(JSON.stringify({ GEOJSON: Tasks.tasks }));
});

console.log('GAAN! 🌲🌲🌲')