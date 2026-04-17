const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema({
      month: String,
      numbers: [Number],
      winners: [{
            userId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User"
            },
            name: String,
            matchType: String
      }]
}, {
      timestamps: true
});

module.exports = mongoose.model("Draw", drawSchema);
