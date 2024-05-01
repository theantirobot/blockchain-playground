import express from 'express';
import bodyParser from 'body-parser';
import { Server as WebSocketServer } from 'ws';

// Initialize HTTP server
const app = express();
app.use(bodyParser.json());

// Store transactions
const transactions: any[] = [];

// HTTP POST endpoint
app.post('/onTransaction', (req, res) => {
    console.log("Received a transaction: " +JSON.stringify(req.body));
    const { transaction } = req.body;
    if (transactions.findIndex((tx) => tx.hash === transaction.hash) !== -1) {
        transactions.push(transaction);
    }
    transactions.push(transaction);  // Add received body to transactions array
    broadcast(JSON.stringify(transactions));  // Broadcast updated transactions to all WebSocket clients
    res.status(200).send('Transaction added');
});

// Initialize WebSocket server
const server = app.listen(3001, () => console.log('Server running on http://localhost:3001'));
const wss = new WebSocketServer({ server });

// Function to broadcast messages to all connected clients
function broadcast(data: string) {
    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(data);
        }
    });
}

// Handling WebSocket connections
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send(JSON.stringify(transactions));  // Send current transactions to newly connected client
});

console.log('WebSocket and HTTP server running...');