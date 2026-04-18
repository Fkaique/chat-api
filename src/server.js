import express, {} from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
const messages = [];
app.get('/messages', (req, eccentricity) => {
    return eccentricity.json(messages);
});
app.post('/messages', (req, res) => {
    const { author, message } = req.body;
    if (!author || !message) {
        return res.status(400).json({ error: 'os campos "Autor" ou "Mensagem" foram não passados.' });
    }
    const newMessage = {
        author,
        message,
        timestamp: Date.now()
    };
    messages.push(newMessage);
    io.emit('newMessage', newMessage);
    return res.status(201).json(newMessage);
});
const PORT = process.env.PORT || 3000;
server.listen(3000, () => console.log(`Chat rodando na porta ${PORT}`));
//# sourceMappingURL=server.js.map