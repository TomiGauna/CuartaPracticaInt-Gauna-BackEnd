import winston from "winston";
import config from "../config/config.js";

const customLevelsAlternatives = {

    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },

    colours: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        http: 'cyan',
        debug: 'green'
    },
};

const devLogger = winston.createLogger({

    levels: customLevelsAlternatives.levels,
    
    transports:[
        new winston.transports.Console({ 
            level: 'debug', 
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
        }),
    ]
});

const prodLogger = winston.createLogger({

    levels: customLevelsAlternatives.levels,
    transports:[
        new winston.transports.Console({ 
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsAlternatives.colours }),
                winston.format.simple(),
            ),
        }),

        new winston.transports.File({ filename: './errors.log', level: 'error' })
    ]
});

export const addLogger = (req, res, next) => {
    
    switch (process.env.NODE_ENV) {
        case 'development':
            req.logger = devLogger;
            break;

        case 'production':
            req.logger = prodLogger;
            break;

        default:
            req.logger = devLogger
            break;
    };

    /* req.logger.http(`${req.method} in ${req.url} - ${new Date().toLocaleDateString()}, environmenet: ${config.environment}`) */
    next();
};

export const mainLogger = () => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return devLogger;
            break;
    
        case 'production':
            return prodLogger;
            break;

        default:
            return devLogger;
            break;
    }
}