import mongoose from "mongoose";

const usersColl = 'users';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
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