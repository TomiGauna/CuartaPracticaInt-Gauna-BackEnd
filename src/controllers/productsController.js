import { ProductsService } from "../services/productsService.js";
import ProductsDTO from "../dtos/productsDTO.js";
import CustomError from "../errors/customError.js";
import { serverProdsErrorInfo } from "../errors/info.js";
import EErrors from "../errors/enums.js";

const prodService = new ProductsService();

export const getAllProducts = async(req, res) => {
    
    try {
        const allProds = await prodService.getAllProds();
        if(!allProds) req.logger.error('Error: allProds could not be reached')
        res.send(JSON.stringify(allProds));

    } catch (error) {
        req.logger.error(error.message);
        CustomError.CreateError({
            name: 'Server performance error',
            cause: serverProdsErrorInfo(),
            code: EErrors.SERVER_ERROR,
            message: 'Fail to get, create, update or delete products'
        })
    };
};

export const getProdById = async(req, res) => {

    try {
        const pid = req.params.pid;
        const prodInvolved = await prodService.getProdById(pid);

        if (!prodInvolved) {
            req.logger.error('Error: Product not found')
            res.status(404).send('Product not found')
        } else {
            res.status(200).send({ payload: new ProductsDTO(prodInvolved) })
        };

    } catch (error) {
        req.logger.error('Server error', error.message);
        CustomError.CreateError({
            name: 'Server performance error',
            cause: serverProdsErrorInfo(),
            code: EErrors.SERVER_ERROR,
            message: 'Fail to get, create, update or delete products'
        });
    };
}

export const addProduct = async(req, res) => {

    try {
        const user = req.user;
        const newProd = req.body;
        const creatingProd = await prodService.addProd(newProd);
        
        if (creatingProd) {
            creatingProd.owner = user.email;
            await creatingProd.save();
            res.status(200).send({status: 1}, 'Product created successfully', creatingProd)
        } else {
            req.logger.error('Error: A new product cannot be created')
            res.status(400).send('Bad request. Verify entrance data')
        };

    } catch (error) {
        req.logger.error('Server error', error.message);
        CustomError.CreateError({
            name: 'Server performance error',
            cause: serverProdsErrorInfo(),
            code: EErrors.SERVER_ERROR,
            message: 'Fail to get, create, update or delete products'
        });   
    };
};

export const updateProduct = async (req, res) => {
    try {
        const updId = req.params.updId;
        const body = req.body;
        const modifiedProd = await prodService.updateProd(updId, body);

        if (modifiedProd) {
            res.status(200).send({message: 'Product updated successfully', modifiedProd})
        } else {
            req.logger.error('Error: Product could not be modified');
            res.status(404).send('Non-existent product')
        }
    
      } catch (error) {
        req.logger.error('Server error', error.message);
        CustomError.CreateError({
            name: 'Server performance error',
            cause: serverProdsErrorInfo(),
            code: EErrors.SERVER_ERROR,
            message: 'Fail to get, create, update or delete products'
        });
      }
};

export const deleteProduct = async (req, res) => {
    try {
        const removedId = req.params.removedId;
        const prodToDelete = await prodService.deleteProd(removedId);

        if (prodToDelete) {
            res.status(200).send('Product deleted successfully')
        } else {
            req.logger.error('Error: Product could not be delted');
            res.status(404).send('None product has the called id')
        }
    
      } catch (error) {
        req.logger.error('Server error: ', error.message)
        CustomError.CreateError({
            name: 'Server performance error',
            cause: serverProdsErrorInfo(),
            code: EErrors.SERVER_ERROR,
            message: 'Fail to get, create, update or delete products'
        });
      };
};