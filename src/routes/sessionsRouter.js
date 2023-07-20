import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

///////////////////////////////////////////////////REGISTER
router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failedregister'}), async(req, res) => {
    res.send({ status: 'success', message: 'User successfully registered' });
})

router.get('/failedregister', (req, res) => {
    res.status(400).send({ status: "error", error: 'Fail to create user' });
});


////////////////////////////////////////////////////LOGIN
router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/failtologin'}), async (req, res) => {
    let user = req.user;
    if (!user) return res.status(400).send({ status: "error", error: "Check username or password" });
    
    let role = false;
    user.email.includes('admin') ? role = true : role;

    req.session.user = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
        userRole: role,
    }
    res.send({ status: "success", payload: req.session.user, message: 'Correct login' });
})

router.get('/failtologin', (req, res) => {
    res.status(400).send({ status: "error", error: "Fail to login. Please check your data" });
});


////////////////////////////////////////////////////CHANGE PASSWORD
router.put('/changePassword', async(req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send({ status: 'error', error: 'Invalid values'})
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).send({ status: 'error', error: 'User not found or does not exist' });
    }

    const newHashedPswd = createHash(password);
    await userModel.updateOne({ _id: user._id }, { $set: { password: newHashedPswd }});
    res.send({ status: 'success', message: 'Password modified successfully'});
})


/////////////////////////////////////////////////LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
        res.redirect('/login');
    })
})


//////////////////////////////////////////////////GITHUB LOGIN
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
});

export default router