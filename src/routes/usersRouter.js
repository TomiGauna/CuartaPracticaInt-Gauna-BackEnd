import { Router } from "express";
import uploader from "../utils/multer.js";
import { UsersController } from "../controllers/usersController.js";

const router = Router();
const usersController = new UsersController();

router.get('/premium/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await usersController.updateUserRole(uid);
        res.send({ message: `User premium updated!`, user });
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.post('/:uid/documents', uploader.array('documents'), async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await usersController.updateUserDocuments(uid, req.files);
        res.send({ status: 1, message: 'User documents updated!', user });
    } catch (err) {
        res.json({ error: err.message });
    }
});

export default router