require('dotenv').config();
const express = require('express');
const path = require('path');
const prerenderNode = require('prerender-node');
const app = express();
app.disable(`x-powered-by`);

const HOSTNAME = process.env.SERVER_HOST || '127.0.0.1';
const PORT = process.env.PORT || 3009;
const PRERENDER_KEY = process.env.PRERENDER_KEY;

prerenderNode.set('prerenderToken', PRERENDER_KEY);
app.use(prerenderNode);
app.use(express.static(`build`));

app.get('*', (_, response) =>
  response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
);

app.listen(PORT, HOSTNAME, () => {
  const serverAddress = `http://${HOSTNAME}:${PORT}`;
  console.log(`Server running at ${serverAddress}`);
});
