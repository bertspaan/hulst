const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const Tasks = require("./tasks")

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {

    try {
      let m = JSON.parse(message)
      console.log('SERV_RECV', m)

      // taak update
      if (m.TASKUPDATE) {
        let { nummer, done } = m.TASKUPDATE
        console.log('DO UPDATE', nummer, done)
        Tasks.update_task(nummer, done)
      }

    } catch (error) {
      console.log('MESSAGE', message)
    }
  });

  Tasks.on_update((geoJson) => {
    ws.send(JSON.stringify({ GEOJSON: geoJson }));
  })

  ws.send(JSON.stringify({ GEOJSON: Tasks.tasks }));
});

console.log('GAAN! 🌲🌲🌲')