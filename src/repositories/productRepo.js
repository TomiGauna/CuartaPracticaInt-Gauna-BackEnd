import ProductsDao from "../newDaos/productsDAO.js";
import ProductsDTO from '../dtos/productsDTO.js';

export default class ProductsRepository{
    constructor(){
        this.dao = new ProductsDao();
    };

    getAllProducts = async() => {
        const products = await this.dao.getAllProducts();
        return products
    };

    getProdById = async(id) => {
        const product = await this.dao.getProdById(id);
        return product
    };

    createProd = async(body) =>{
        const dto = await ProductsDTO(body)
        const newProduct = await this.dao.createProd(dto);
        return newProduct
    };

    updateProduct = async(pId, obj) => {
        const updProd = await this.dao.updateProduct(pId, obj);
        return updProd
    };

    deleteProduct = async(id) => {
        await this.dao.deleteProduct(id);
    }
}