const User = require("../models/User");
const Score = require("../models/Score");
const Draw = require("../models/Draw");
const Charity = require("../models/Charity");

exports.getUsers = async (req, res) => {
      const users = await User.find().select("-password");
      res.json(users);
};

exports.addCharity = async (req, res) => {
      const charity = await Charity.create(req.body);
      res.json(charity);
};

exports.runDraw = async (req, res) => {
      try {
            const users = await User.find();
            const scores = await Score.find();

            if (scores.length === 0) {
                  return res.status(400).json({
                        message: "No scores available"
                  });
            }

            // Active users only
            const activeUsers = users.filter(
                  user => user.subscriptionStatus === "active"
            );

            // Pool calculation
            const totalPool = activeUsers.length * 500;

            // Previous jackpot rollover
            const lastDraw = await Draw.findOne().sort({
                  createdAt: -1
            });

            const previousCarry =
                  lastDraw?.jackpotCarry || 0;

            // Winning numbers (hybrid logic)
            const submittedNumbers = scores.map(s => s.score);

            const freq = {};

            submittedNumbers.forEach(num => {
                  freq[num] = (freq[num] || 0) + 1;
            });

            const sortedNumbers = Object.keys(freq)
                  .sort((a, b) => freq[b] - freq[a])
                  .map(Number);

            let numbers = [...sortedNumbers.slice(0, 3)];

            while (numbers.length < 5) {
                  const rand =
                        Math.floor(Math.random() * 45) + 1;

                  if (!numbers.includes(rand)) {
                        numbers.push(rand);
                  }
            }

            numbers = numbers.sort(() => Math.random() - 0.5);

            let winners = [];

            for (let user of activeUsers) {
                  const userScores = scores
                        .filter(
                              s =>
                                    s.userId.toString() ===
                                    user._id.toString()
                        )
                        .map(s => s.score);

                  const matches = userScores.filter(score =>
                        numbers.includes(score)
                  ).length;

                  if (matches >= 3) {
                        winners.push({
                              userId: user._id,
                              name: user.name,
                              matchType: matches.toString(),
                              prize: 0
                        });
                  }
            }

            // prize tiers
            let fivePool =
                  totalPool * 0.40 + previousCarry;

            let fourPool =
                  totalPool * 0.35;

            let threePool =
                  totalPool * 0.25;

            const fiveWinners = winners.filter(
                  w => w.matchType === "5"
            );

            const fourWinners = winners.filter(
                  w => w.matchType === "4"
            );

            const threeWinners = winners.filter(
                  w => w.matchType === "3"
            );

            // distribute prizes
            if (fiveWinners.length > 0) {
                  const each = fivePool / fiveWinners.length;

                  for (let w of fiveWinners) {
                        w.prize = each;

                        await User.findByIdAndUpdate(
                              w.userId,
                              { $inc: { totalWon: each } }
                        );
                  }

                  // previousCarry = 0;
            }

            if (fourWinners.length > 0) {
                  const each = fourPool / fourWinners.length;

                  for (let w of fourWinners) {
                        w.prize = each;

                        await User.findByIdAndUpdate(
                              w.userId,
                              { $inc: { totalWon: each } }
                        );
                  }
            }

            if (threeWinners.length > 0) {
                  const each =
                        threePool / threeWinners.length;

                  for (let w of threeWinners) {
                        w.prize = each;

                        await User.findByIdAndUpdate(
                              w.userId,
                              { $inc: { totalWon: each } }
                        );
                  }
            }

            const jackpotCarry =
                  fiveWinners.length === 0 ? fivePool : 0;

            const draw = await Draw.create({
                  month: new Date().toLocaleString(
                        "default",
                        { month: "long" }
                  ),

                  numbers,
                  totalPool,
                  jackpotCarry,
                  winners
            });

            res.json(draw);

      } catch (error) {
            res.status(500).json({
                  message: error.message
            });
      }
};

exports.getDraws = async (req, res) => {
      const draws = await Draw.find().sort({ createdAt: -1 });
      res.json(draws);
};
