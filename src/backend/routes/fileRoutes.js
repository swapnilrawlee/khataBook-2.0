import express from "express";
import {
  readDirectory,
  readFile,
  createFile,
  updateFile,
  deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();

router.get("/data", readDirectory);
router.get("/edit/:files", readFile);
router.post("/create", createFile);
router.post("/edit/:files", updateFile);
router.delete("/delete/:files", deleteFile);

export default router;
