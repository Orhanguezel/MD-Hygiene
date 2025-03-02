import express from "express";
import { getCompanyInfo, updateCompanyInfo, createCompany } from "../controllers/companyController.js";

const router = express.Router();

router.route("/").get(getCompanyInfo).post(createCompany);
router.route("/:id").put(updateCompanyInfo);

export default router;
