import MessagesDAO from '../newDaos/messagesDAO.js';
import MessagesDTO from '../dtos/messagesDTO.js';

export default class MessagesRepository{
    constructor(){
        this.dao = new MessagesDAO();
    };

    getAllMessages = async() => {
        const messages = await this.dao.getAllMessages();
        return messages
    };

    addMessage = async(body) => {
        const dto = await MessagesDTO(body);
        await this.dao.addMessage(dto);
    };
}