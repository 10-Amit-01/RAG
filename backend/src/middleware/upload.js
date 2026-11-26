import multer from "multer";
import crypto from "node:crypto";
import { HttpError } from "../utils/HttpError.js";

const storage = multer.diskStorage({
  destination: './upload/',
  filename: (req, file, cb) => cb(null, crypto.randomUUID() + '.pdf')
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const isPdf = file.originalname.toLowerCase().endsWith('.pdf');
    const mimeType = file.mimetype === 'application/pdf';
    if (isPdf && mimeType) {
      cb(null, true);
    } else {
      cb(new HttpError(400, "Only PDF files are allowed"));
    }
  }
}).single('file');
