const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
      addScore,
      getMyScores,
      updateScore,
      deleteScore
} = require("../controllers/scoreController");

router.post("/add", protect, addScore);
router.get("/my", protect, getMyScores);
router.put("/:id", protect, updateScore);
router.delete("/:id", protect, deleteScore);

module.exports = router;
