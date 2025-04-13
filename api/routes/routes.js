const express = require("express");
const { fetchData } = require("../controllers/fetchAdventureController");

const router = express.Router();

router.get("/fetchAdventureCategory", fetchData);

module.exports = router;
