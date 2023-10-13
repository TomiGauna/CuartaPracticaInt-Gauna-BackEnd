import userModel from "../models/user.model.js";

export default class UsersManager {
    userModel;

    constructor() {
        this.userModel = userModel;
    }

    async getAllUsers() {
        try {
            const users = await this.userModel.find({});

            return users;
        } catch (error) {
            console.log(
                "UsersManager ~ getAllUsers ~ error:",
                error.message
            );
        }
    }

    async getUserByEmail(email) {
        try {
            const userData = await this.userModel.findOne({ email });

            return userData;
        } catch (error) {
            console.log(
                "UsersManager ~ getUserByEmail ~ error:",
                error.message
            );
        }
    }

    async getUserById(id) {
        try {
            const userData = await this.userModel.findOne({ _id: id });

            return userData;
        } catch (error) {
            console.log(
                "UsersManager ~ getUserById ~ error:",
                error.message
            );
        }
    }

    async toggleUserRole(user) {
        try {
            const newRole = user.role === "premium" ? "user" : "premium";
            return await user.updateOne({ role: newRole });
        } catch (error) {
            console.log(
                "UsersManager ~ toggleUserRole ~ error:",
                error.message
            );
        }
    }

    async setLastConnection(user) {
        try {
            return await user.updateOne({ last_connection: new Date() });
        } catch (error) {
            console.log(
                "UsersManager ~ toggleUserRole ~ error:",
                error.message
            );
        }
    }
}