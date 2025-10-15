const express = require("express");
const { adminValdation } = require("../middlewares/authvalidation");
const { adminLogin } = require("../controllers/authController");
const router = express.Router();

router.post("/admin", adminValdation, adminLogin);

module.exports = router;
