import { Router } from "express";
import passport from 'passport';
import cookieParser from "cookie-parser";
import setLastConnection from "../utils/lastconnMiddleware.js";
import { register, 
    failedRegister, 
    login, 
    githubCb, 
    failedLogin, 
    logout, 
    currentRoute,  
    sendingMailToRecover,
    changeUserRole} from '../controllers/sessionsController.js';


const router = Router();
router.use(cookieParser());

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), register);
router.get('/failregister', failedRegister);

router.post("/login", 
            passport.authenticate('login', { session: false, failureRedirect: '/api/sessions/faillogin'}), 
            setLastConnection,
            login);

router.get('/faillogin', failedLogin);

router.get('/retrievePass/:email', sendingMailToRecover);
//router.get('/retrievePassword', sendingMailToRecover);
router.get('/premium/:uid', changeUserRole);

router.get('/current', passport.authenticate("current", { session: false }), currentRoute);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/sessions/login' }), githubCb);

router.get("/logout", logout);

export default router;