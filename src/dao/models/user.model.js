import mongoose from "mongoose";

const usersColl = 'users';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },

    lastName: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: false,
        unique: true
    },

    age: {
        type: Number,
        required: false
    },

    password: {
        type: String,
        required: false
    },
});

const userModel = mongoose.model(usersColl, userSchema);

export default userModel