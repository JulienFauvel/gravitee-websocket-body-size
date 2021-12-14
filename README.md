Gravitee Websocket body size limit
---

Requirements to reproduce:
* Docker
* docker-compose
* Node.js & NPM


Build and start the stack:

```bash
docker-compose build up
```

In Gravitee Management UI, configure an API:
  * Context path: `/ws`
  * Public plan
  * Backend endpoint: `http://websocketserver:8080/ws`

Run client:
```bash
cd ./client

# Install the dependenciens
npm install

# Run the client
# 1st arg is the message sent in byte (default 1000)
# 2nd arg is a boolean: true (default) message is sent through Gravitee,
#    false message is sent directly to the websocket server

# Disconnect on Gravitee
node app.js 8500000 true

# Is sent when directly on the server
node app.js 8500000 false
```

Error on Gateway:
```
11:31:48.935 [vert.x-eventloop-thread-5] [] ERROR i.vertx.core.net.impl.ConnectionBase - Max frame length of 65536 has been exceeded.
```
