const express = require("express");
const router = express.Router();

const batchesController = require("../controllers/batches_controller");
router.get("/", batchesController.getBatches);
router.post("/create", batchesController.createBatch);

module.exports = router;
