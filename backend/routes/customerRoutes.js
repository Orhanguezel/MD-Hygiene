import express from "express";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.route("/").get(getAllCustomers).post(createCustomer);
router.route("/:id").get(getCustomerById).put(updateCustomer).delete(deleteCustomer);

export default router;
