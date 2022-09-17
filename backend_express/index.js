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
      broadcastWork(ws, data);
    }
  });
});

const connectionHandler = (ws, data) => {
  users.push(data.name);
  ws.id = data.id;
  broadcastConnection(ws, data);
};

const broadcastConnection = (ws, data) => {
  aWss.clients.forEach((client) => {
    if (client.id === data.id && data.method === 'connection') {
      ws.send(
        JSON.stringify({
          method: data.method,
          messages,
          users,
        }),
      );
    }
  });
};

const broadcastWork = (ws, data) => {
  messages.push(data.message);
  aWss.clients.forEach((client) => {
    if (client.id === data.id && data.method === 'message') {
      ws.send(
        JSON.stringify({
          method: data.method,
          messages,
          users,
        }),
      );
    }
  });
};

app.listen(PORT, () => {
  console.log(`Application run on the ${PORT}`);
});
