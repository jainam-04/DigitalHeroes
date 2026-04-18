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
      try {
            const user = await User.findById(req.user._id)
                  .populate("selectedCharity");

            const scores = await Score.find({
                  userId: req.user._id
            }).sort({ date: -1 });

            const scoresStored = scores.length;

            const highestScore =
                  scores.length > 0
                        ? Math.max(...scores.map((item) => item.score))
                        : 0;

            const averageScore =
                  scores.length > 0
                        ? (
                              scores.reduce(
                                    (sum, item) => sum + item.score,
                                    0
                              ) / scores.length
                        ).toFixed(1)
                        : 0;

            const latestScore =
                  scores.length > 0
                        ? scores[0].score
                        : 0;

            res.json({
                  name: user.name,
                  email: user.email,

                  subscriptionStatus: user.subscriptionStatus,
                  planType: user.planType,
                  expiryDate: user.expiryDate,

                  charity: user.selectedCharity,
                  donationPercent: user.donationPercent,

                  totalWon: user.totalWon,

                  scoresStored,
                  highestScore,
                  averageScore,
                  latestScore
            });

      } catch (error) {
            res.status(500).json({
                  message: error.message
            });
      }
};

