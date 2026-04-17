const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      password: {
            type: String,
            required: true
      },
      role: {
            type: String,
            default: "user"
      },
      subscriptionStatus: {
            type: String,
            default: "inactive"
      },
      planType: {
            type: String,
            default: ""
      },
      expiryDate: Date,
      selectedCharity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Charity"
      },
      donationPercent: {
            type: Number,
            default: 10
      },
      totalWon: {
            type: Number,
            default: 0
      }
}, {
      timestamps: true
})

module.exports = mongoose.model("User", userSchema)