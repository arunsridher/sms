const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");
router.get("/", homeController.home);

router.use("/users", require("./users"));
router.use("/students", require("./students"));
router.use("/batches", require("./batches"));

module.exports = router;
