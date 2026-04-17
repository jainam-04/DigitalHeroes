const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
      getProfile,
      subscribePlan,
      selectCharity,
      getDashboard
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);
router.post("/subscribe", protect, subscribePlan);
router.post("/charity", protect, selectCharity);
router.get("/dashboard", protect, getDashboard);

module.exports = router;
