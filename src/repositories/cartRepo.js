import CartsDAO from '../daos/cartsDAO.js';

export default class CartsRepository{
    constructor(){
        this.dao = new CartsDAO();
    };

    getAllCarts = async() => {
        const carts = await this.dao.getAllCarts();
        return carts
    };

    getCartbyId = async(id) => {
        const cart = await this.dao.getCartId(id);
        return cart
    };

    createCart = async() => {
        const newCart = await this.dao.createCart();
        return newCart
    };

    addProdToCart = async(cId, pId) => {
        const prod = await this.dao.addProdToCart(cId, pId);
        return prod
    };

    updateCart = async(cId, upProds) => {
        const modifiedCart = await this.dao.updateCart(cId, upProds);
        return modifiedCart
    };

    updQuantity = async(cId, prodId, alteredQuantity) => {
        await this.dao.updQuantity(cId, prodId, alteredQuantity);
    };

    removeProdInCart = async(cId, prodId) => {
        const cart = await this.dao.getCartId(cId);
        await this.dao.removeProdInCart(cId, prodId);
        return cart
    };

    cleanCart = async(id) => {
        const cart = await this.dao.cleanCart(id);
        return cart
    };

    deleteCart = async(id) => {
        await this.dao.deleteCart(id);
    }

}