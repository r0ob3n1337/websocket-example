const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const username = prompt('Please enter your usrname:');

// Connect to WebSocket-server
const ws = new WebSocket('ws://localhost:8080');

// handle open connection
ws.onopen = () => {
    console.log('Connected!');
    ws.send(JSON.stringify({username, text: 'connected'}))
};

// handle new messages from ws
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const message = document.createElement('div');
    message.textContent = `${data.username}: ${data.text}`;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight; // scroll down
};

// handle disconnect
ws.onclose = () => {
    console.log('Disconnected');
};

// send message
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        ws.send(JSON.stringify({username, text: message}));
        messageInput.value = ''; // clear input
    }
});

// send message by Enter key
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});