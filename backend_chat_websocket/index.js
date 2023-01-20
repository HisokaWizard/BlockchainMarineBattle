const express = require('express');
const app = express();
const expressWS = require('express-ws')(app);
const aWss = expressWS.getWss();

const users = [];
const messages = [];

const PORT = process.env.PORT || 7077;

app.ws('/chat', (ws, req) => {
  console.log('Connect enable!!');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.method === 'connection') {
      connectionHandler(ws, data);
    }
    if (data.method === 'message') {
      broadcastConnection(data);
    }
  });
});

const connectionHandler = (ws, data) => {
  users.push(data.name);
  ws.id = data.id;
  broadcastConnection(data);
};

const broadcastConnection = (data) => {
  if (data.method === 'message') {
    messages.push(data.message);
  }
  aWss.clients.forEach((client) => {
    if (client.id === data.id) {
      client.send(
        JSON.stringify({
          method: data.method,
          messages,
          users,
          id: data.id,
        }),
      );
    }
  });
};

app.listen(PORT, () => {
  console.log(`Application run on the ${PORT}`);
});
