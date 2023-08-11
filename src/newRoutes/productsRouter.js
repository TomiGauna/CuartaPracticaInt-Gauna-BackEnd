import { Router } from "express";
import { getAllProducts, getProdById, addProduct, updateProduct, deleteProduct  } from "../controllers/productsController.js";


const router = Router();

router.get('/', getAllProducts);
router.get('/:pid', getProdById);
router.post('/', addProduct);
router.put('/:updId', updateProduct);
router.delete('/:removedId', deleteProduct);

export default router