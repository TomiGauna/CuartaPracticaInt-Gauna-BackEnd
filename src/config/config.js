import dotenv from 'dotenv';

dotenv.config();

export default{
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence: process.env.PERSISTENCE,
    environment: process.env.NODE_ENV,
    mailing: {
        service: process.env.MAIL_SERVICE,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_PASS,
        },
    },
    baseUrl: process.env.BASE_URL
}