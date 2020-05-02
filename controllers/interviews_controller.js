const Interview = require("../models/interview");

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
