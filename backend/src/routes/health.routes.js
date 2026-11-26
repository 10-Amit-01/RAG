import { Router } from "express";

const router = Router();

router.use('/health', (req, res) => {
  console.log('server is healthy');
  res.json({ "status": "server is running" });
});

export default router;
