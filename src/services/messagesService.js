import MessageManager from "../newDaos/messagesDAO";

export default class MessagesService{
    constructor(){
        this.messagesDao =  new MessageManager();
    };

    getAllMsgs = async() => {
        let messagesObtaining = await this.messagesDao.getAllMessages();
        return messagesObtaining;
    };

    addMsg = async() => {
        let addingMsg = await this.messagesDao.addMessage();
        return addingMsg;
    };
}