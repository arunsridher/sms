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
    console.log("interview &&&", interview.applications);
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
