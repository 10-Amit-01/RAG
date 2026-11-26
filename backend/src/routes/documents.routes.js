import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { uploadDocument } from "../controllers/documents.controller.js";

const router = Router();

router.post('/upload', upload, uploadDocument);

export default router;
