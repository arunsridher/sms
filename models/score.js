const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    dsa: {
      type: Number,
      required: true,
    },
    webd: {
      type: Number,
      required: true,
    },
    react: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;

/*
scores: [
  {
    course: String,
    score: Number
  }
]
*/
