
import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Post route working");
});

export default router;
