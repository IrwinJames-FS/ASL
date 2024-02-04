const express = require("express");
const imgCtrl = require("../controllers/images");

const router = express.Router();

router.delete("/:id", imgCtrl.remove);

module.exports = router;