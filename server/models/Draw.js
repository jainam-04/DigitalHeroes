const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema({
      month: String,
      numbers: [Number],
      totalPool: Number,
      jackpotCarry: {
            type: Number,
            default: 0
      },
      winners: [{
            userId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User"
            },
            name: String,
            matchType: String,
            prize: Number
      }]
}, {
      timestamps: true
});

module.exports = mongoose.model("Draw", drawSchema);
