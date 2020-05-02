const Student = require("../models/student");
const Interview = require("../models/interview");
const Batch = require("../models/batch");

module.exports.getData = async function (req, res) {
  try {
    let interviews = await Interview.find({}).populate({
      path: "applications.student",
      model: "Student",
    });
    let students = await Student.find({});
    return res.render("csv", {
      title: "SMS | CSV",
      students: students,
      interviews: interviews,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};
