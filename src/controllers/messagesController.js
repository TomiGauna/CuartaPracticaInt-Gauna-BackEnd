import MessagesService from "../services/messagesService.js";
import { io } from "../app.js";

const messageService = new MessagesService();

export const getMessages = async (req, res) => {
    try {
        const getMessages = await messageService.getAllMsgs();

        !getMessages ? res.status(404).send('No messages') : res.status(200).send(getMessages);

    } catch (error) {
        res.status(500).send('Server error' + error.message);
    }
};

export const createMessage = async (req, res) => {
    try {
        const { user, message } = req.body;
        const addMessage = await messageService.addMsg(user, message);
        io.emit('messageLogs', messages);

        !addMessage ? res.status(404).send('Fail to add message') : 
                      res.status(200).send('Message added correctly');
    
    } catch (error) {
        res.status(500).send('Server error' + error.message);
    }
};