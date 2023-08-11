import { ProductsService } from "../services/productsService.js";

const prodService = new ProductsService();

export const getAllProducts = async(req, res) => {
    
    try {
        const allProds = await prodService.getAllProds();
        res.send(JSON.stringify(allProds));

    } catch (error) {
        res.status(500).send({ status: error, message: 'Products cannot be reached' });
    };
};

export const getProdById = async(req, res) => {

    try {
        const pid = req.params.pid;
        const prodInvolved = await prodService.getProdById(pid);
        (!prodInvolved) ? res.status(404).send('Product not found') : res.status(200).send({ payload: prodInvolved });
        
    } catch (error) {
        res.status(500).send({ status: error.message, msg: 'Error to get product data' });
    };
}

export const addProduct = async(req, res) => {

    try {
        const newProd = req.body;
        const creatingProd = await prodService.addProd(newProd);
        creatingProd ? res.status(200).send('Product created successfully', creatingProd) : res.status(400).send('Bad request. Verify entrance data');

    } catch (error) {
        res.status(500).send({error: 'Server failure to add product', message: error.message});   
    };
};

export const updateProduct = async (req, res) => {
    try {
        const updId = req.params.updId;
        const body = req.body;
        const modifiedProd = await prodService.updateProd(updId, body);

        modifiedProd ? res.status(200).send({message: 'Product updated successfully', payload}) : res.status(404).send('Non-existent product');
    
      } catch (error) {
        res.status(500).send(error.message);
      }
};

export const deleteProduct = async (req, res) => {
    try {
        const removedId = req.params.removedId;
        const prodToDelete = await prodService.deleteProd(removedId);

        prodToDelete ? res.status(200).send('Product deleted successfully') : res.status(404).send('None product has the called id');
    
      } catch (error) {
        res.status(500).send({ error: 'Server error to delete element', message: error.message });
      }
};