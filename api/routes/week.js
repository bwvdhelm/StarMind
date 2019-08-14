const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const WeekController = require('../controllers/week');

/*
 * Create a new week from scratch and add it to current user
 */
router.post("/add", checkAuth, WeekController.add_week);

/*
 * Get week by id
 */
router.get("/:weekId", checkAuth, WeekController.get_week);

module.exports = router;
