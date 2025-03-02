import express from "express";
import { getStores, addStore, getStoreById, updateStore, deleteStore} from "../controllers/storeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getStores)
router.route("/:id").get(getStoreById).put(protect, updateStore).delete(protect, deleteStore);
router.route("/add").post(protect, addStore);

export default router;
