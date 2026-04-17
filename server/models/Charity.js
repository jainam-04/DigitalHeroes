const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema({
      name: String,
      description: String,
      image: String
}, {
      timestamps: true
});

module.exports = mongoose.model("Charity", charitySchema);
