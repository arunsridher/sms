const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // students: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Student",
    //   },
    // ],
    // other fields like duration, courses, course content, timings, etc
  },
  {
    timestamps: true,
  }
);

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;
