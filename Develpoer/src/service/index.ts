import express from "express";
import { find_fonts_by } from "./font";

const router = express.Router();
router.get("/api/fonts", find_fonts_by);

export default router;
