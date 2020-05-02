const mongoose = require("mongoose");

const interviewScheduleSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    result: {
      type: String,
      enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
    },
  },
  {
    timestamps: true,
  }
);

const InterviewSchedule = mongoose.model(
  "InterviewSchedule",
  interviewScheduleSchema
);
module.exports = InterviewSchedule;
