const Student = require("../models/student");
const Interview = require("../models/interview");
// const InterviewSchedule = require("../models/interviewSchedule");

module.exports.createInterview = async function (req, res) {
  try {
    let interview = await Interview.create({
      company: req.body.company,
      date: req.body.date,
    });

    return res.redirect("/interviews");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.getInterviews = async function (req, res) {
  try {
    let interviews = await Interview.find({}).sort("-createdAt");
    return res.render("interviews", {
      title: "SMS | Interviews",
      interviews: interviews,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.scheduleInterview = async function (req, res) {
  try {
    let interview = await Interview.findById(req.params.id);
    console.log(interview);
    let students = await Student.find({});
    return res.render("interview_schedule", {
      title: "SMS | Interviews",
      interview: interview,
      students: students,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.addApplicant = async function (req, res) {
  try {
    let interviewSchedule = await Interview.findById(req.body.interview);
    if (interviewSchedule) {
      console.log(interviewSchedule.applications);
      console.log(req.body.student);
      interviewSchedule.applications.push({
        student: req.body.student,
      });
      interviewSchedule.save();
    }
    res.redirect("back");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};
