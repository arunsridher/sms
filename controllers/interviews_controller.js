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
    let interview = await Interview.findById(req.params.id).populate({
      path: "applications.student",
      model: "Student",
    });
    let students = await Student.find({});
    return res.render("interview_schedule", {
      title: "SMS | Interview",
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
      let applicants = interviewSchedule.applications;
      for (let i = 0; i < applicants.length; i++) {
        if (applicants[i].student.equals(req.body.student)) {
          console.log("student application exists");
          return res.redirect("back");
        }
      }
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

module.exports.updateApplicantStatus = async function (req, res) {
  console.log(req.body.interview);
  console.log(req.body.student);
  console.log(req.body.result);
  try {
    let interviewSchedule = await Interview.findById(req.body.interview);
    let studentId = req.body.student;
    if (interviewSchedule) {
      let applicants = interviewSchedule.applications;
      for (let i = 0; i < applicants.length; i++) {
        if (applicants[i].student.equals(studentId)) {
          console.log("inside student");
          applicants[i].result = req.body.result;
          interviewSchedule.save();
          return res.redirect("back");
        }
      }
    }
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};
