import express from "express";
import multer from "multer";
import crypto from "node:crypto";

const PORT = process.env.PORT || 3000;
const app = express();

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const storage = multer.diskStorage({
  destination: './upload/',
  filename: (req, file, cb) => cb(null, crypto.randomUUID() + '.pdf')
});

const upload = multer({
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

app.post('/upload', upload, (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ "error": "No file uploaded" });
  }
  console.log(req.file);
  res.status(201).json({ "message": "File Uploaded successfully" });
});

app.use('/health', (req, res) => {
  console.log('server is healthy');
  res.json({ "status": "server is running" });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    return res.status(status).json({ error: err.message });
  }
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});