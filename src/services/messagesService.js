import MessagesRepository from '../repositories/messagesRepo.js';

export default class MessagesService{
    constructor(){
        this.repos =  new MessagesRepository();
    };

    getAllMsgs = async() => {
        let messagesObtaining = await this.repos.getAllMessages();
        return messagesObtaining;
    };

    addMsg = async(body) => {
        let addingMsg = await this.repos.addMessage(body);
        return addingMsg;
    };
}