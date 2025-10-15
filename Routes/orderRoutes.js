const express = require("express");
const { createAOrder, getOrderbyEmail } = require("../controllers/orderController");
const router = express.Router();

//create order endpoint
router.post("/", createAOrder);

//get order by mail
router.get("/email/:email", getOrderbyEmail);

module.exports = router;
