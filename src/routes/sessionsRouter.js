import { Router } from "express";
import userModel from "../dao/models/user.model.js";

const router = Router();

router.post('/register', async(req, res) => {

    const { firstName, lastName, email, age, password } = req.body;
    const verifingRegistration = await userModel.findOne( { email } );

    if (!verifingRegistration) {
        const newUser = { firstName, lastName, email, age, password }
        
        await userModel.create(newUser);
        res.send({status: 'success', msg: 'User successfully registered'})
    } else {
        res.status(400).send({status: Error, message: 'This user already exists. Please change your e-mail'})
    }
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        res.status(400).send({status: 'Error', message: 'This user does not exist. Please register yourself'})
    }

    if (user.password !== password) {
        return res.status(400).send({ status: "error", error: "Incorrect password" });
    }

    let role = false;
    if (email.includes("admin")) {
        role = true;
    }
    

    /* email.includes("admin") ? role = true : role = false; */

    req.session.user = {
        firstName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
        userRole: role
    }

    res.send({status: 'success', msg: 'Successful login', payload: req.session.user})
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
        res.redirect('/login');
    })
})

export default router