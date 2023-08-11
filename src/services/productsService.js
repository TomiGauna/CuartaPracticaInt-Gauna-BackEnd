import ProductsDao from "../newDaos/productsDAO.js";

export class ProductsService{
    constructor(){
        this.productsDao = new ProductsDao();
    }

    getAllProds = async(limit, page, sort, query) => {
        let gettingProds = await this.productsDao.getAllProducts(limit, page, sort, query);
        return gettingProds;
    };

    getProdById = async(id) => {
        let searchingProd = await this.productsDao.getProdById(id);
        return searchingProd;
    };

    addProd = async(prod) =>{
        let addingProd = await this.productsDao.createProd(prod);
        return addingProd;
    };

    updateProd = async(id, prod) => {
        let updatingProd = await this.productsDao.updateProduct(id, prod);
        return updatingProd;
    };

    deleteProd = async(id) => {
        let deletingProcess = await this.productsDao.deleteProduct(id);
        return deletingProcess;
    };
}