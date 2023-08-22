import { Router } from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { login, 
        failedLogin, 
        register, 
        failedRegister, 
        currentRoute, 
        changePassword, 
        logout, 
        githubCb } from "../controllers/sessionsController2.js";

const router = Router();
router.use(cookieParser());

///////////////////////////////////////////////////REGISTER
router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failedregister'}), register);

router.get('/failedregister', failedRegister);


////////////////////////////////////////////////////LOGIN
router.post('/login', passport.authenticate('login', { session: false, failureRedirect: '/api/sessions/failtologin'}), login);

router.get('/failtologin', failedLogin);

/////////////////////////////////////////////////////"CURRENT" ROUTE
router.get('/current', passport.authenticate('current', { session: false }), currentRoute);

////////////////////////////////////////////////////CHANGE PASSWORD
router.put('/changePassword', changePassword)

/////////////////////////////////////////////////LOGOUT
router.get('/logout', logout);

//////////////////////////////////////////////////GITHUB LOGIN
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), githubCb);

export default router