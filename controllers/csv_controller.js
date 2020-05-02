const Student = require("../models/student");
const Interview = require("../models/interview");
const Batch = require("../models/batch");

module.exports.getData = async function (req, res) {
  try {
    let interviews = await Interview.find({}).populate({
      path: "applications.student",
      model: "Student",
      populate: {
        path: "score",
        model: "Score",
      },
    });
    let students = await Student.find({});

    let data = await formatData(interviews, students);
    let keys = Object.keys(data[0]);
    // console.log(keys);
    // console.log("data", data);
    return res.render("csv", {
      title: "SMS | CSV",
      data: data,
      keys: keys,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

async function formatData(interviews, students) {
  let data = [];
  let totalStudents = [];
  for (interview of interviews) {
    for (applicant of interview.applications) {
      let obj = {};
      let id = applicant.student._id;
      id = id.toString();
      if (!totalStudents.includes(id)) {
        totalStudents.push(id);
      }
      obj["studentId"] = id;
      obj["studentName"] = applicant.student.name;
      obj["studentCollege"] = applicant.student.college;
      obj["studentStatus"] = applicant.student.status;
      obj["dsaFinalScore"] = applicant.student.score
        ? applicant.student.score.dsa
        : null;
      obj["webdFinalScore"] = applicant.student.score
        ? applicant.student.score.webd
        : null;
      obj["reactFinalScore"] = applicant.student.score
        ? applicant.student.score.react
        : null;
      obj["interviewDate"] = getFormattedDate(interview.date);
      obj["interviewCompany"] = interview.company;
      obj["interviewResult"] = applicant.result;
      data.push(obj);
    }
  }
  for (student of students) {
    let id = student._id;
    id = id.toString();
    if (!totalStudents.includes(id)) {
      totalStudents.push(id);
      let obj = {};
      obj["studentId"] = id;
      obj["studentName"] = student.name;
      obj["studentCollege"] = student.college;
      obj["studentStatus"] = student.status;
      obj["dsaFinalScore"] = student.score ? student.score.dsa : null;
      obj["webdFinalScore"] = student.score ? student.score.webd : null;
      obj["reactFinalScore"] = student.score ? student.score.react : null;
      obj["interviewDate"] = null;
      obj["interviewCompany"] = null;
      obj["interviewResult"] = null;
      data.push(obj);
    }
  }
  return data;
}

function getFormattedDate(date) {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = date.getDate();
  let m = monthNames[date.getMonth()];
  let y = date.getFullYear();
  let formattedDate = d + " " + m + " " + y;
  return formattedDate;
}
