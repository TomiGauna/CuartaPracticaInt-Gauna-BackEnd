import mongoose from "mongoose";
import chai from 'chai';
import config from "../config/config.js";
import ProductsDao from "../daos/productsDAO.js";

const expect = chai.expect;
mongoose.connect(`${process.env.PORT}`);

/////////////////////////////////////////////////////////////UNIT TESTS
describe(`Products' Testing`, () => {

    before(function() {

        this.productsDAO = new ProductsDao();
    });

    /* beforeEach(function(){
        this.timeout(5000);
    }); */

    it('Should return an array with all the products', async function(){
        this.timeout(5000);
        const products = await this.productsDAO.getProducts();
        
        expect(products).to.be.ok
        expect(products).to.be.a('array');
    });

    it('Should return an object specified by ID', async function(){
        this.timeout(5000);
        let id = '64a36f59b962882be13f2f97';

        const product = await this.productsDAO.getProdById(id);
        expect(product).to.be.ok;
        expect(product).to.be.a('object');
    });

    it('Should create a new product properly and with all its properties', async function(){
        this.timeout(5000);
        let mockProd = {
            title: 'Nell Latitud 3120',
            description: 'Made by Dell Inc.',
            price: 440000,
            category: 'notebook',
            code: 131,
            stock: 6,
            thumbnail: [],
        };

        const outcome = await this.productsDAO.createProd(mockProd);

        expect(outcome._id).to.be.ok;
        expect(outcome.title).to.be.ok;
        expect(outcome.description).to.be.ok;
        expect(outcome.price).to.be.ok;
        expect(outcome.category).to.be.ok;
        expect(outcome.stock).to.be.ok;
        expect(outcome.code).to.be.ok;
        expect(outcome.thumbnail).to.be.ok;
        expect(outcome.owner).to.be.ok;
        expect(outcome).to.be.a('object');
    });

    it('Should update a product properly. In this case stock and code will be changed from an exisiting product', async function(){
        this.timeout(5000);

        let id = '64a36f59b962882be13f2f97'
        const product = await this.productsDAO.getProdById(id);

        const modifiedProps = {
            stock: 20,
            code: 200
        };

        await this.productsDAO.updateProduct(product._id, modifiedProps);
        const updatedProd = await this.productsDAO.getProdById(id);

        expect(updatedProd._id).to.be.ok;
        expect(updatedProd).to.be.a('object');
        expect(updatedProd.stock).to.equal(modifiedProps.stock);
        expect(updatedProd.code).to.equal(modifiedProps.code);
    });

    it('Should delete a product from the database', async function(){
        this.timeout(5000);

        let pid = '651b94d4f1f45fc30b7c26e3';
        await this.productsDAO.deleteProduct({ _id: pid });

        const removedProd = await this.productsDAO.getProdById(pid);
        /* console.log(removedProd); */
        const prods = await this.productsDAO.getProducts();

        expect(removedProd).to.be.null;
        expect(prods.length).to.equal(25);
    });
});
