import { default as token } from 'jsonwebtoken';
import { PRIVATE_KEY } from '../utils.js';
import UsersManager from '../MongoManagers/MongoUsersManager.js';
import nodemailer from 'nodemailer';
import config from '../config/config.js';

const mailConfig = {
    service: process.env.MAIL_SERVICE,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS
    }
}

const transport = nodemailer.createTransport(mailConfig);

export class UsersController{

    constructor() {
        this.usersManager = new UsersManager();
    }

    sendEmail = async(email) => {

        try {
            const jwt = this.createJWT(email)
            transport.sendMail({
                from: `iTech Store <${process.env.MAIL_AUTH_USER}>`,
                to: email,
                subject: 'Password Retrieval',
                html: `<p>In order to retrieve your password, please click the button below</p>
                <hr>
                <button><a href="http://${process.env.BASE_URL}:${process.env.PORT}/retrievePass/${jwt}">Retrieve Password</a></button>`
            })
        } catch (error) {
            console.log('Fail to send retrieval e-mail: ' + error.message)
        }
    }

    createJWT(email){
        return token.sign({ email }, PRIVATE_KEY, { expiresIn: '1h' })
    }

    async setLastConnection(email){
        try {
            const user = await this.usersManager.getUserByEmail(email);
            if( !user ) throw new Error('User not found');
            await this.usersManager.setLastConnection(user);
        } catch (e) {
            throw new Error(e);
        }
    }
    
    async updateUserDocuments(id, files){
        try {
            const user = await this.usersManager.getUserById(id);
            const documents = user.documents || [];
    
            // const newDocuments = documents;
            // files.forEach(file => {
            //     newDocuments.push({ name: file.originalname, reference: file.path })
            // });
    
            const newDocuments = [
                ...documents,
                ...files.map(file => ({ name: file.originalname, reference: file.path }))
            ];
    
            return await user.updateOne({ documents: newDocuments });
        } catch (e) {
            res.json({ error: e });
        }
    }

    async updateUserRole(id){
        try {
            const user = await this.usersManager.getUserById(id);
    
            if(user.role === 'user'){
                const requiredDocuments = ['id', 'address', 'accountState'];
                const userDocuments = user.documents || [];
    
                const hasAllDocuments = requiredDocuments.every(requiredDocument => {
                    return userDocuments.some(userDocument => userDocument.name.includes(requiredDocument))
                });
    
                if (!hasAllDocuments) throw new Error('User must have all documents');
            }
    
            return await this.usersManager.toggleUserRole(user);
        } catch (e) {
            throw new Error(e.message);
        }
    }
}