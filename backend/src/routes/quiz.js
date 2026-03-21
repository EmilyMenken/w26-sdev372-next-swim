import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET quiz questions by type
router.get("/:type", async (req, res) => {
  const { type } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM quiz_questions WHERE quiz_type = ?",
      [type]
    );

    // parse JSON options
    const formatted = rows.map(q => ({
      ...q,
      options: JSON.parse(q.options)
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quiz questions" });
  }
});

export default router;