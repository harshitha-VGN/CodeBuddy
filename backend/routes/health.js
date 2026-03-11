import { Router } from "express";
const router = Router();

// No authMiddleware here!
router.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server is Running" });
});

export default router;