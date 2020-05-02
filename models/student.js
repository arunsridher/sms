const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["placed", "not_placed"],
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },
    score: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Score",
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
