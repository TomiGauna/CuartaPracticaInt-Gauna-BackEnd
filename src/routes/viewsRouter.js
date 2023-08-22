import { Router } from "express";
import cookieParser from "cookie-parser";
import { products,
        getCartbyId,
        realTimeProds,
        chat,
        login,
        register,
        changePswd,
        profile } from "../controllers/viewsController.js";
import { isUserMiddleware } from "../config/passport.config.js";

const router = Router();
router.use(cookieParser());

router.get('/products', products);

router.get("/carts/:cid" ,getCartbyId);

router.get('/realtimeproducts', realTimeProds)

router.get('/chat', isUserMiddleware, chat)

router.get('/login', login)

router.get('/register', register);

router.get('/profile', profile);

router.get('/changePassword', changePswd);


export default router