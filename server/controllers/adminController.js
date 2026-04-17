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

      const users = await User.find();
      const scores = await Score.find();

      let numbers = [];

      while (numbers.length < 5) {
            const num = Math.floor(Math.random() * 45) + 1;

            if (!numbers.includes(num)) {
                  numbers.push(num);
            }
      }

      let winners = [];

      for (let user of users) {

            const userScores = scores
                  .filter(s => s.userId.toString() === user._id.toString())
                  .map(s => s.score);

            let matches = userScores.filter(score =>
                  numbers.includes(score)
            ).length;

            if (matches >= 3) {
                  winners.push({
                        userId: user._id,
                        name: user.name,
                        matchType: matches.toString()
                  });
            }
      }

      const draw = await Draw.create({
            month: new Date().toLocaleString("default", {
                  month: "long"
            }),
            numbers,
            winners
      });

      res.json(draw);
};

exports.getDraws = async (req, res) => {
      const draws = await Draw.find().sort({ createdAt: -1 });
      res.json(draws);
};
