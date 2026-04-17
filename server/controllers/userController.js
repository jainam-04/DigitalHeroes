const User = require("../models/User");
const Score = require("../models/Score");
const Charity = require("../models/Charity");

exports.getProfile = async (req, res) => {
      const user = await User.findById(req.user._id)
            .populate("selectedCharity");

      res.json(user);
};

exports.subscribePlan = async (req, res) => {
      const { plan } = req.body;

      let days = plan === "yearly" ? 365 : 30;

      const expiry = new Date();
      expiry.setDate(expiry.getDate() + days);

      const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                  subscriptionStatus: "active",
                  planType: plan,
                  expiryDate: expiry
            },
            { new: true }
      );

      res.json({
            message: "Subscription activated",
            user
      });
};

exports.selectCharity = async (req, res) => {
      const { charityId, donationPercent } = req.body;

      const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                  selectedCharity: charityId,
                  donationPercent
            },
            { new: true }
      );

      res.json(user);
};

exports.getDashboard = async (req, res) => {
      const user = await User.findById(req.user._id)
            .populate("selectedCharity");

      const scoreCount = await Score.countDocuments({
            userId: req.user._id
      });

      res.json({
            name: user.name,
            email: user.email,
            subscriptionStatus: user.subscriptionStatus,
            planType: user.planType,
            expiryDate: user.expiryDate,
            charity: user.selectedCharity,
            donationPercent: user.donationPercent,
            totalWon: user.totalWon,
            totalScores: scoreCount
      });
};
