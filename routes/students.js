const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/students_controller");
router.get("/", studentsController.getStudents);
router.post("/create", studentsController.createStudent);
router.get("/edit/:id", studentsController.editStudent);
router.post("/update", studentsController.updateStudent);

module.exports = router;
