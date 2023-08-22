import userModel from "../dao/models/user.model.js";
import { createHash } from '../utils/utils.js';
import UsersDTO from "../dtos/usersDTO.output.js";

///////////////////////////////////////////////////REGISTER
export const register = async(req, res) => {
    res.send({ status: 'success', message: 'User successfully registered' });
}

///////////////////////////////////////////////////FAILED REGISTER
export const failedRegister = async(req, res) => {
    res.status(400).send({ status: "error", error: 'Fail to create user' });
};


////////////////////////////////////////////////////LOGIN
export const login = async(req, res) => {
    let user = req.user;
    if (!user) return res.status(400).send({ status: "error", error: "Check username or password" });
    
    req.user.user.email.includes('admin') ? role = true : role;

    /* req.session.user = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
        userRole: role,
    } */
    res.cookie('TomsCookie', req.user, { httpOnly: true }).status(200).send('Correct Cookie Setting');
};

////////////////////////////////////////////////////FAILEDLOGIN
export const failedLogin = async(req, res) => {
    res.status(400).send({ status: "error", error: "Fail to login. Please check your data" });
}


/////////////////////////////////////////////////////"CURRENT" ROUTE
export const currentRoute = async(req, res) => {
    if(!req.user) res.status(404).send('The user you look for cannot be reached');
    res.status(200).send(new UsersDTO(req.user.user));
};

////////////////////////////////////////////////////CHANGE PASSWORD
export const changePassword = async(req, res) => {
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
}; 

/////////////////////////////////////////////////LOGOUT
export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
        res.redirect('/login');
    })
};

//////////////////////////////////////////////////GITHUB LOGIN
export const githubCb = async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
};
