const express = require("express");
const router = express.Router();

const Charity = require("../models/Charity");

router.get("/", async (req, res) => {
      const data = await Charity.find();
      res.json(data);
});

router.post("/", async (req, res) => {
      const charity = await Charity.create(req.body);
      res.json(charity);
});

module.exports = router;
