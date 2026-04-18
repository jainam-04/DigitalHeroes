const Score = require("../models/Score");

exports.addScore = async (req, res) => {
      try {
            const { score, date } = req.body;

            if (score < 1 || score > 45) {
                  return res.status(400).json({
                        message: "Score must be between 1 and 45"
                  });
            }

            const existing = await Score.findOne({
                  userId: req.user._id,
                  date
            });

            if (existing) {
                  return res.status(400).json({
                        message: "Score already exists for this date"
                  });
            }

            const scores = await Score.find({
                  userId: req.user._id
            }).sort({ createdAt: 1 });

            if (scores.length >= 5) {
                  await Score.findByIdAndDelete(scores[0]._id);
            }

            await Score.create({
                  userId: req.user._id,
                  score,
                  date
            });

            res.status(201).json({
                  message: "Score added successfully"
            });

      } catch (error) {
            res.status(500).json({
                  message: error.message
            });
      }
};

exports.getMyScores = async (req, res) => {
      try {
            const scores = await Score.find({
                  userId: req.user._id
            }).sort({ date: -1 });

            res.json(scores);

      } catch (error) {
            res.status(500).json({
                  message: error.message
            });
      }
};

exports.updateScore = async (req, res) => {
      try {
            const { score } = req.body;
            
            if (score < 1 || score > 45) {
                  return res.status(400).json({
                        message: "Score must be between 1 and 45"
                  });
            }

            const updated = await Score.findByIdAndUpdate(
                  req.params.id,
                  { score },
                  { new: true }
            );

            res.json(updated);

      } catch (error) {
            res.status(500).json({
                  message: error.message
            });
      }
};

exports.deleteScore = async (req, res) => {
      try {
            await Score.findByIdAndDelete(req.params.id);

            res.json({
                  message: "Deleted successfully"
            });

      } catch (error) {
            res.status(500).json({
                  message: error.message
            });
      }
};
