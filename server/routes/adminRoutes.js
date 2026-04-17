const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
      getUsers,
      addCharity,
      runDraw,
      getDraws
} = require("../controllers/adminController");

router.get("/users", protect, adminOnly, getUsers);
router.post("/charity", protect, adminOnly, addCharity);
router.post("/draw", protect, adminOnly, runDraw);
router.get("/draws", protect, adminOnly, getDraws);

module.exports = router;
