import { Router } from "express";
import { getCarts, 
    getCartById, 
    creatingCart, 
    addingProdInCart, 
    updateCart, 
    updateQuantity, 
    deleteProdInCart, 
    cleaningCart,
    deleteCart } from "../controllers/cartsController.js";
import { isUserMiddleware } from "../config/passport.config.js";

const router = Router();

router.get('/', getCarts);
router.get('/:cid/', getCartById);
router.post('/', creatingCart);
router.post('/:cid/product/:pid', isUserMiddleware, addingProdInCart);
router.put('/:cid/', updateCart);
router.put('/:cid/product/:pid/', updateQuantity);
router.delete('/:cid/', cleaningCart);
router.delete('/:cid/product/:pid', deleteProdInCart);
router.delete('/delete/:cid/', deleteCart);

export default router