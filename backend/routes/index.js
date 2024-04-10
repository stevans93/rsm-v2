const express = require('express');
const router = new express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/municipality", require("./municipality"));

module.exports = router;