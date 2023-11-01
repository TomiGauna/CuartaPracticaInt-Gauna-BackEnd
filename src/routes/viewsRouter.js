import { Router } from "express";
import cookieParser from "cookie-parser";
import { products,
        getCartbyId,
        realTimeProds,
        chat,
        login,
        register,
        changePswd,
        profile, 
        mockingProds,
        createMockingProds, 
        loggerTest, 
        retrievePass} from "../controllers/viewsController.js";
import { isUserMiddleware } from "../config/passport.config.js";
import { tokenValidation } from "../utils.js";

const router = Router();
router.use(cookieParser());

router.get('/products', products);

router.get("/carts/:cid" ,getCartbyId);

router.get('/realtimeproducts', realTimeProds);

router.get('/chat', isUserMiddleware, chat);

router.get('/login', login)

router.get('/register', register);

router.get('/profile', profile);

router.get('/changePassword', changePswd);

router.get('/retrievePass', /* tokenValidation */ retrievePass);

router.get('/mockingproducts', mockingProds);

router.post('/mockingproducts', createMockingProds);

router.get('/loggerTest', loggerTest);


export default router