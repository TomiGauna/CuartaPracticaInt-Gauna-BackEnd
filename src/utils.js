import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PRIVATE_KEY = 'SecretTokenKey';

export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
};

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ status: "error", error: "Unauthorized" });
    const token = authHeader.split(' ')[1];

    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        console.log(err);
        if (err) return res.status(401).send({ status: "error", error: "Unauthorized" })
        req.user = credentials.user;
        next();
    })
};

export const tokenValidation = (req, res, next) => {

    try {
        const token = req.params.token;
        jwt.verify(token, PRIVATE_KEY);
        const data = jwt.decode(token);
        console.log('Data: ', {data});
        req.email = data.email;

        next();
    } catch (error) {
        res.status(500).json('Fail to validate token: ', error.message);
    }
    
}

////////////////////////MOCKING FUNCTION
faker.location = 'es'
export const generateProd = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        code: faker.number.int({ min: 0, max: 100000 }),
        stock: faker.number.int({ min: 0, max: 100 }),
        thumbnail: [],
        id: faker.number.int({ min: 1, max: 123456789 })
    }
}

export default __dirname;