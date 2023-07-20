import passport from "passport";
import local from 'passport-local';
import userService from '../dao/models/user.model.js';
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2';

const localStrategy = local.Strategy;
const initializePassport = () => {

    passport.use('register', new localStrategy(

        {passReqToCallback: true, usernameField: 'email'}, async(req, username, password, done) => {
            const { firstName, lastName, email, age } = req.body;
            if (!firstName || !lastName || !email || !age || !password) {
                return Error('All fields are required')
            }
            
            try {
                let user = await userService.findOne({ email: username });
                if (user) return done(null, false);

                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age: parseInt(age),
                    password: createHash(password),
                }

                let outcome = await userService.create(newUser);
                return done(null, outcome);

            } catch (error) {
                return done('Fail to create user' + error);
            }
        }
    ));


    passport.use('login', new localStrategy(
        
        { usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await userService.findOne({ email: username });
            if(!user) return done(null, false, { message: 'User does not exist' });
            if(!isValidPassword(user, password)) return done(null, false);

            return done(null, user);

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
            let user = await userService.findOne({ email: profile._json.email });
            if (user) return done(null, user);

            const newUser = {
                firstName: profile._json.name,
                lastName: '',
                email: profile._json.email,
                age: 20,
                password: '',
            }

            user = await userService.create(newUser);
            return done(null, user);

        } catch (error) {
            return done(error.message);
        }
    }));


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });


    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await userService.findOne({ _id });
            return done(null, user);
        } catch {
            return done({ message: "Error deserializing user" });
        }
    });
};

export default initializePassport