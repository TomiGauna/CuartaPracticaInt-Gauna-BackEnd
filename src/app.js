import express from "express";
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
/* import productsRouter from './routes/productsRouter.js'; */
import prodsRouter from './routes/productsRouter.js'
import cartsRouter from './routes/cartsRouter.js'
import messagesRouter from './routes/messagesRouter1.js'
import viewsRouter from './routes/viewsRouter.js';
import sessionsRouter from './routes/sessionsRouter.js';
import usersRouter from './routes/usersRouter.js';
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
/* import config from './config/config.js'; */
import errorHandler from './errors/middlewares/index.js';
import { addLogger } from "./utils/loggers.js";
import { mainLogger } from "./utils/loggers.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express';

const app = express();

const serverHttp = app.listen(process.env.PORT, () => {
    const logger = mainLogger()
    logger.info(`Hearing on port ${process.env.PORT}`);
});

export const io = new Server(serverHttp);

const mongo = process.env.MONGO_URL||8081;

export const connection = mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
        }).then((conn) => {
            const logger = mainLogger();
            logger.info(`Mongo DB connected in ${process.env.NODE_ENV} environment`)
        }).catch((error) => {
            const logger = mainLogger();
            logger.error('Something Broke! '+ error.message);
        });

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: `iTech Store's API Documentation`,
            description: 'Documentation of iTech Store with Swagger'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJSDoc(swaggerOptions);

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(__dirname+'/public'));
app.use(session({
    store: new MongoStore({
        mongoUrl: mongo,
        ttl: 3600
    }),
    secret: 'TomHacker',
    resave: true,
    saveUninitialized: true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(addLogger);

app.use('/api/products/', prodsRouter);
/* app.use('/api/products/', productsRouter);  */
app.use('/api/carts/', cartsRouter);
app.use('/api/messages/', messagesRouter);
app.use('/api/sessions/', sessionsRouter);
app.use('/api/users/', usersRouter);
app.use('/', viewsRouter);

app.use(errorHandler)
