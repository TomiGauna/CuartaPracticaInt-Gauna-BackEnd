import ProductManager from "../dao/MongoManagers/MongoProdManager.js";
import CartManager from "../dao/MongoManagers/MongoCartManager.js";
import { generateProd } from "../utils.js";
import CustomError from "../errors/customError.js";
import { generateProdErrorInfo } from "../errors/info.js";
import EErrors from "../errors/enums.js";

const prodManager = new ProductManager();
const cartManager = new CartManager();


export const products = async(req, res) => {
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);
    let sort = req.query.sort;
    let query = req.query.query;

    let products = await prodManager.getAllProducts(limit, page, sort, query);
    let prodsToJSON = products.docs.map(prod => prod.toJSON());
    
    const separation = {
        productslpsq: products,
        prodsDocs: prodsToJSON,
        user: req.user,
    };

    res.render ('prods', { title: 'iTech Store',
                            style: 'home.css',
                            allProds: separation.prodsDocs,
                            workedDocs: separation.productslpsq,
                            user: separation.user });
};

export const getCartbyId = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cartFound = await cartManager.getCartId(cartId);
  
      res.render("cart", {
        title: "iTech Store",
        cartFound: cartFound,
        style: 'style.css'
      });
    } catch (error) {
      console.error("Internal Server Error: ", error.message);
      res.status(500).send("Fail to get products");
    };
};

export const realTimeProds = async(req, res) => {
    const products = await prodManager.getAllProducts();
    res.render('realTimeProducts', {title: 'iTech Store',
                        style: 'realtime.css', 
                        products})
};

export const chat = (req, res) => {
    res.render('chat', { title: "Application's Chat",
                         style: 'css/chat.css' })
};

export const login = (req, res) => {
    res.render('login', { title: 'Login', style: 'login.css' });
};

export const register = (req, res) => {
    res.render('register', { title: 'Register', style: 'register.css' });
};

export const profile = (req, res) => {
    res.render('profile', { user: req.user, title: 'Profile', style: 'profile.css' });
};

export const changePswd = (req, res) => {
    res.render('changePassword', { title: 'Password Restarting', style: 'changePswd.css' })
};

const productss = [];
export const mockingProds = async(req, res) => {
    for (let i = 0; i < 51; i++) {
        productss.push(generateProd());
    };

    res.render('mockingProds', { status: 'success', 
                    title: 'Mocking Products', 
                    style: 'home.css', 
                    products: productss })
};

export const createMockingProds = (req, res) => {
    const { title, description, price, category, code, stock, thumbnail } = req.body;

    if (!title || !description || !price || !category || !code || !stock || !thumbnail) {
        CustomError.CreateError({
            name: 'Product Creation Issue',
            cause: generateProdErrorInfo({ title, description, price, category, code, stock, thumbnail }),
            code: EErrors.INVALID_TYPES_ERROR,
            message: 'Fail to create product'
        });
    };

    const newProd = {
        title,
        description,
        price,
        category,
        code,
        stock,
        thumbnail
    };

    productss.push(newProd);
    res.send({ status: 'success', newProd })
};