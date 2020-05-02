const Student = require("../models/student");
const Batch = require("../models/batch");
const Score = require("../models/score");

module.exports.createStudent = async function (req, res) {
  try {
    let student = await Student.create({
      name: req.body.name,
      college: req.body.college,
      batch: req.body.batch,
    });

    let students = await Student.find({})
      .sort("-createdAt")
      .populate("batch")
      .populate("score");
    console.log(students);
    return res.render("students", {
      title: "SMS | Students",
      students: students,
      batches: batches,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.getStudents = async function (req, res) {
  try {
    let students = await Student.find({})
      .sort("-createdAt")
      .populate("batch")
      .populate("score");
    console.log(students);
    let batches = await Batch.find({});
    return res.render("students", {
      title: "SMS | Students",
      students: students,
      batches: batches,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.editStudent = async function (req, res) {
  try {
    let student = await Student.findById(req.params.id)
      .populate("batch")
      .populate("score");
    let batches = await Batch.find({});
    res.render("student_edit", {
      title: "SMS | Edit Student",
      student: student,
      batches: batches,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.updateStudent = async function (req, res) {
  try {
    console.log(req.body);
    let student = await Student.findById(req.body.id);
    if (student) {
      let score;
      if (student.score) {
        score = await Score.findById(student.score);
        score.dsa = req.body.dsa;
        score.webd = req.body.webd;
        score.react = req.body.react;
        await score.save();
      } else {
        score = await Score.create({
          dsa: req.body.dsa,
          webd: req.body.webd,
          react: req.body.react,
        });
      }
      student.name = req.body.name;
      student.college = req.body.college;
      student.batch = req.body.batch;
      student.status = req.body.status;
      student.score = score._id;
      await student.save();
      console.log(student);
      let students = await Student.find({})
        .sort("-createdAt")
        .populate("batch")
        .populate("score");
      let batches = await Batch.find({});
      return res.redirect("/students");
    }
    res.redirect("back");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};
