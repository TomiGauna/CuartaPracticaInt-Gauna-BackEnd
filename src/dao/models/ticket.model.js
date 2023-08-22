import mongoose from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },

    purchaseDatetime: {
        type: Date,
        required: true,
    },

    amount: {
        type: Number,
        required: true
    },

    purchaser: {
        type: String,
        required: true
    },
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);
export default ticketModel