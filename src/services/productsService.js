import ProductsRepository from '../repositories/productRepo.js';

export class ProductsService{
    constructor(){
        this.repos = new ProductsRepository();
    }

    getAllProds = async(limit, page, sort, query) => {
        let gettingProds = await this.repos.getAllProducts(limit, page, sort, query);
        return gettingProds;
    };

    getProdById = async(id) => {
        let searchingProd = await this.repos.getProdById(id);
        return searchingProd;
    };

    addProd = async(prod) =>{
        let addingProd = await this.repos.createProd(prod);
        return addingProd;
    };

    updateProd = async(id, prod) => {
        let updatingProd = await this.repos.updateProduct(id, prod);
        return updatingProd;
    };

    deleteProd = async(id) => {
        let deletingProcess = await this.repos.deleteProduct(id);
        return deletingProcess;
    };
}