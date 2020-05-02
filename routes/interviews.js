const express = require("express");
const router = express.Router();

const interviewsController = require("../controllers/interviews_controller");

router.get("/", interviewsController.getInterviews);
router.post("/create", interviewsController.createInterview);
router.get("/schedule/:id", interviewsController.scheduleInterview);
router.post("/addApplicant", interviewsController.addApplicant);
router.post(
  "/updateApplicantStatus",
  interviewsController.updateApplicantStatus
);
module.exports = router;
