import CartsRepository from "../repositories/cartRepo.js";
import { ProductsService } from '../services/productsService.js';

export default class cartsService{
    constructor(){
        this.repos = new CartsRepository();
        this.prodService = new ProductsService();
    };

    getAllCarts = async() => {
        let getCarts = await this.repos.getAllCarts();
        return getCarts;
    };

    getCartById = async(id) => {
        let gettingCart = await this.repos.getCartbyId(id);
        return gettingCart;
    };

    creatingCart = async() => {
        let creatingProcess = await this.repos.createCart();
        return creatingProcess;
    };

    getProdsInCart = async() => {
        let seekingProdInC = await this.repos.getProdsInCart();
        return seekingProdInC;
    };

    includeProdInC = async(cId, pId) => {
        let includingProd = await this.repos.addProdToCart(cId, pId);
        return includingProd;
    };

    updateCart = async(cId, updProds) => {
        let updatingCart = await this.repos.updateCart(cId, updProds);
        return updatingCart;
    };

    updateQuantity = async(cId, pId, altQ) => {
        let changingQuantity = await this.repos.updQuantity(cId, pId, altQ);
        return changingQuantity;
    };

    removingProdInC = async(cId, pId) => {
        let removingProd = await this.repos.removeProdInCart(cId, pId);
        return removingProd;
    };

    cleaningCart = async(cId) => {
        let cleaningProcess = await this.repos.cleanCart(cId);
        return cleaningProcess;
    };

    deletingCart = async(cId) => {
        let cartToDelete = await this.repos.deleteCart(cId);
        return cartToDelete
    };

    checkoutCart = async (cId, buyer) => {
        try {
            const cart = await this.repos.getCartbyId(cId);
            if (!cart) {
                throw new Error('Cart not found');
            }
            if (cart.products.length === 0) {
                throw new Error('Cart is empty');
            }
            const products = cart.products;

            const productsPurchased = [];
            const productsNotPurchased = [];

            for (const product of products) {
                try {
                    await this.prodService.updateProductStock(product.productId._id.toString(), -product.quantity);
                    productsPurchased.push(product);
                } catch (error) {
                    productsNotPurchased.push(product);
                }
            }

            if (productsPurchased.length === 0) {
                throw new Error('No products were purchased');
            }

            await this.repos.cleanCart(cId);
            if (productsNotPurchased.length > 0) {
                const newCartProducts = productsNotPurchased.map((product) => {
                    return { productId: product.productId._id.toString(), quantity: product.quantity }
                });
                await this.addProductsToCart(cId, newCartProducts);
            }
            const remainingCart = await this.repos.getCartbyId(cId);

            const totalAmount = productsPurchased.reduce((total, product) => total + (product.productId.price * product.quantity), 0);
            const newTicket = await this.ticketService.createTicket({ amount: totalAmount, buyer: buyer });

            if (!newTicket) {
                throw new Error('Failed to create ticket');
            }

            const purchaseCartResult = {
                ticket: newTicket,
                productsPurchased: productsPurchased,
                productsNotPurchased: productsNotPurchased,
                remainingCart: remainingCart
            }

            return purchaseCartResult;
        } catch (error) {
            throw new Error(`Failed to purchase cart: ${error.message}`);
        }
    }
}