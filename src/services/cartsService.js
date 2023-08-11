import CartsDao from "../newDaos/cartsDAO.js";

export default class cartsService{
    constructor(){
        this.cartsDao = new CartsDao();
    };

    getAllCarts = async() => {
        let getCarts = await this.cartsDao.getAllCarts();
        return getCarts;
    };

    getCartById = async(id) => {
        let gettingCart = await this.cartsDao.getCartId(id);
        return gettingCart;
    };

    creatingCart = async() => {
        let creatingProcess = await this.cartsDao.createCart();
        return creatingProcess;
    };

    getProdsInCart = async() => {
        let seekingProdInC = await this.cartsDao.getProdsInCart();
        return seekingProdInC;
    };

    includeProdInC = async(cId, pId) => {
        let includingProd = await this.cartsDao.addProdToCart(cId, pId);
        return includingProd;
    };

    updateCart = async(cId, updProds) => {
        let updatingCart = await this.cartsDao.updateCart(cId, updProds);
        return updatingCart;
    };

    updateQuantity = async(cId, pId, altQ) => {
        let changingQuantity = await this.cartsDao.updQuantity(cId, pId, altQ);
        return changingQuantity;
    };

    removingProdInC = async(cId, pId) => {
        let removingProd = await this.cartsDao.removeProdInCart(cId, pId);
        return removingProd;
    };

    cleaningCart = async(cId) => {
        let cleaningProcess = await this.cartsDao.cleanCart(cId);
        return cleaningProcess;
    };

    deletingCart = async(cId) => {
        let cartToDelete = await this.cartsDao.deleteCart(cId);
        return cartToDelete
    };
}