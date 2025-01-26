const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
    console.log('New connection');

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'notification',
                text: 'New connection'
            }));
        }
    });

    ws.on('message', (rawData) => {
        const data = JSON.parse(rawData)
        console.log(`New message from ${data.username}`, data.text);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data))
            }
        })
    })

    ws.on('close', () => {
        console.log('Some user disconnected');
    })
})

console.log('Server started at ws://localhost:8080');
