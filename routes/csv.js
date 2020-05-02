const express = require("express");
const router = express.Router();

const csvController = require("../controllers/csv_controller");
router.get("/", csvController.getData);

module.exports = router;
