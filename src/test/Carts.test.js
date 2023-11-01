import mongoose from "mongoose";
import chai from 'chai';
import config from "../config/config.js";
import CartsDao from "../daos/cartsDAO.js";
import ProductsDao from "../daos/productsDAO.js";

mongoose.connect(`${process.env.PORT}`);
const expect = chai.expect;

describe(`Carts' Testing`, () => {

    before(function(){
        this.cartsDAO = new CartsDao();
        this.productsDAO = new ProductsDao();
    });

    it('Should display all the carts available in the database. Array format', async function(){
        this.timeout(5000);

        const carts = await this.cartsDAO.getAllCarts();

        expect(carts).to.be.ok;
        expect(carts).to.be.a('array');
    });

    it('Should bring a cart by an specified Id', async function(){
        this.timeout(5000);

        let cid = '649ce690719b6fc7bbdaab1e'
        const cart = await this.cartsDAO.getCartId(cid);

        expect(cart.products).to.be.ok;
    });

    it('Should create an empty cart', async function(){
        this.timeout(5000);

        const newCart = await this.cartsDAO.createCart();

        expect(newCart).to.be.ok;
        expect(newCart.products).to.deep.equal([]);
    });

    it('Should add a product in a cart specified by ID', async function(){
        this.timeout(5000);

        let pid = '64a370009c11b929d620d147';
        let cid = '64e3da48f3049382a2967eac';
        await this.cartsDAO.addProdToCart(cid, pid);

        const cartInvolved = await this.cartsDAO.getCartId(cid);

        expect(cartInvolved.products).not.to.be.empty;
        expect(cartInvolved.products[1]).not.to.be.equal(0);
    });

    it('Should removed a product from a specified cart. Both should be specified by their respective IDs', async function(){
        this.timeout(5000);

        let pid = '64a370009c11b929d620d147';
        let cid = '64e3da48f3049382a2967eac';

        await this.cartsDAO.removeProdInCart(cid, pid);
        const cart = await this.cartsDAO.getCartId(cid);

        expect(cart.products[0]).not.include( {_id: pid} );
    });

    it('Should clean a cart specified by its ID', async function(){
        this.timeout(5000);

        let cid = '64e3da48f3049382a2967eac';
        const cartToClean = await this.cartsDAO.cleanCart(cid);

        expect(cartToClean).to.be.ok;
        expect(cartToClean.products).to.deep.equal([]);
    });

    it('Should remove an entire cart specified by its ID', async function(){
        this.timeout(5000);

        let cid = '64d570b784e620787e0a46e6'
        await this.CartsDAO.deleteCart(cid);

        const carts = await this.cartsDAO.getAllCarts();

        expect(carts).to.be.ok;
        expect(carts).not.include( {_id: cid} );
    });
})