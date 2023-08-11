import { io } from "./app.js";
import MessageManager from "./newDaos/messagesDAO.js";

const messageManager = new MessageManager();
const messages = [];

io.on('connection', socket => {
    console.log("Socket connected");

    socket.on('message', data => {
        messages.push(data);
        messageManager.addMessage(data);
        io.emit('messageLogs', messages);
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data);
    })
})