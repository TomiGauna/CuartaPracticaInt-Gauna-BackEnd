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

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        required: false,
    },

    role: {
        type: String,
        default: 'user',
        required: false,
    }
});

const userModel = mongoose.model(usersColl, userSchema);

export default userModel