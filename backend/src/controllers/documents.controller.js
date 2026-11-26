export function uploadDocument(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ "error": "No file uploaded" });
  }
  console.log(req.file);
  res.status(201).json({ "message": "File Uploaded successfully" });
}
