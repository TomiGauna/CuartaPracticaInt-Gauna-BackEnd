import passport from "passport";
import local from 'passport-local';
import userModel from '../dao/models/user.model.js';
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2';
import jwt from 'passport-jwt';
import { PRIVATE_KEY, generateToken, authToken } from "../utils.js";

const localStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {

    passport.use('register', new localStrategy(

        {passReqToCallback: true, usernameField: 'email'}, async(req, username, password, done) => {
            const { firstName, lastName, email, age } = req.body;
            if (!firstName || !lastName || !email || !age || !password) {
                return Error('All fields are required')
            }
            
            try {
                let user = await userModel.findOne({ email: username });
                if (user) return done(null, false);

                let userRole;

                if (email.includes('admin')) {
                    userRole = 'admin';
                };

                if (email.includes('premium')) {
                    userRole = 'premium';
                };

                if (!(email.includes('admin') || email.includes('premium'))){
                    userRole = 'user';
                };

                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age: parseInt(age),
                    password: createHash(password),
                    role: userRole,
                };
                
                let outcome = await userModel.create(newUser);
                return done(null, outcome);

            } catch (error) {
                return done('Fail to create user' + error);
            }
        }
    ));


    passport.use('login', new localStrategy(
        
        { usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await userModel.findOne({ email: username });
            if(!user) return done(null, false, { message: 'User does not exist' });
            if(!isValidPassword(user, password)) return done(null, false);

            const jwt = generateToken(user)
            return done(null, user, jwt);

        } catch (error) {
            return done({ error: 'Fail to login. Please check your email/password' })
        }
    }));


    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.26ce4ee4c5a9526f',
        clientSecret: 'e6898f0c80b5c6d4a63f67f7f31619895d296166',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            /* console.log({ profile }) */
            let user = await userModel.findOne({ email: profile._json.email });
            if (user) return done(null, user);

            const newUser = {
                firstName: profile._json.name,
                lastName: '',
                email: profile._json.email,
                age: 20,
                password: '',
            }

            user = await userModel.create(newUser);
            return done(null, user);

        } catch (error) {
            return done(error.message);
        }
    }));


    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            done(error);
        }
    }
    ));

    


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });


    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await userModel.findOne({ _id });
            return done(null, user);
        } catch {
            return done({ message: "Error deserializing user" });
        }
    });
};


export const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        return token = req?.cookies['TomsCookie'];
    }
    return token;
};

export const isAdminMiddleware = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    }
    res.status(403).json({ message: 'Only admins allowed' });
};
  
export const isUserMiddleware = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'user') {
        console.log('req.user: ', req.user)
      return next();
    }
    /* console.log(req.user.role) */
    res.status(403).json({ message: 'Only users allowed' });
};

export const isPremiumMiddleware = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'premium') {
      return next();
    }
    res.status(403).json({ message: 'Only premium users allowed' });
};
  

export default initializePassport