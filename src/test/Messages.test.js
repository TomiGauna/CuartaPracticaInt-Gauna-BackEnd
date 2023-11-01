import mongoose from "mongoose";
import chai from 'chai';
import config from "../config/config.js";
import MessagesDAO from "../daos/messagesDAO.js";

mongoose.connect(`${process.env.PORT}`);
const expect = chai.expect;

describe(`Messages' Testing`, () => {

    before(function(){
        this.messagesDAO = new MessagesDAO();
    });

    /* beforeEach(function(){
        this.timeout(5000);
    }); */

    it('Should bring all the messages with all its properties from database', async function(){
        this.timeout(5000);
        
        const messages = await this.messagesDAO.getAllMessages();

        expect(messages).to.be.ok;
        expect(messages[0]).to.be.a('object');
        expect(messages[0]._id).to.be.ok;
        expect(messages[0].user).to.be.ok;
        expect(messages[0].message).to.be.ok;
        expect(messages[0].date).to.be.ok;
    });

    it('Should create or add a message in the database with all its properties', async function(){
        this.timeout(5000);

        let mockMessage = {
            user: 'joecarter@gmail.com',
            message: 'Hi, how are you doing?',
        };

        const outcome = await this.messagesDAO.addMessage(mockMessage.user, mockMessage.message);

        expect(outcome._id).to.be.ok;
        expect(outcome.user).to.be.ok;
        expect(outcome.message).to.be.ok;
        expect(outcome.date).to.be.ok;
    });
})