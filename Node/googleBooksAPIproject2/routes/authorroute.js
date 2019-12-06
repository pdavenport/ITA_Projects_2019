const express = require("express");
const authControl = require("../controllers/authcontrol");
const router = express.Router();

router.post('/author', authControl.addToDB)