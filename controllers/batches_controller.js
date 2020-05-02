const Batch = require("../models/batch");

module.exports.createBatch = async function (req, res) {
  try {
    let batch = await Batch.create({
      name: req.body.name,
    });

    let batches = await Batch.find({}).sort("-createdAt");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.getBatches = async function (req, res) {
  try {
    let batches = await Batch.find({});
    return res.render("batches", {
      title: "SMS | Batches",
      batches: batches,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};
