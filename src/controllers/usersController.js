import { default as token } from 'jsonwebtoken';
import { PRIVATE_KEY } from '../utils.js';
import nodemailer from 'nodemailer';
import config from '../config/config.js';

const mailConfig = {
    service: config.mailing.service,
    port: config.mailing.port,
    auth: {
        user: config.mailing.auth.user,
        pass: config.mailing.auth.pass
    }
}

const transport = nodemailer.createTransport(mailConfig);

export class UsersController{

    sendEmail = async(email) => {

        try {
            const jwt = this.createJWT(email)
            transport.sendMail({
                from: `iTech Store <${config.mailing.auth.user}>`,
                to: email,
                subject: 'Password Retrieval',
                html: `<p>In order to retrieve your password, please click the button below</p>
                <hr>
                <button><a href="http://${config.baseUrl}:${config.port}/retrievePass/${jwt}">Retrieve Password</a></button>`
            })
        } catch (error) {
            console.log('Fail to send retrieval e-mail: ' + error.message)
        }
    }

    createJWT(email){
        return token.sign({ email }, PRIVATE_KEY, { expiresIn: '1h' })
    }
}