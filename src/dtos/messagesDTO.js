export default class MessagesDTO{
    constructor(message){
        this.user = message.user;
        this.content = message.content;
    };
};