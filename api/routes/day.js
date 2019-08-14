const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const DayController = require('../controllers/day')

/*
 * Get specific day
 */
router.get("/:dayId", checkAuth, DayController.get_day);

/*
 * Add recipe to a day
 */
router.post("/addrecipe", checkAuth, DayController.add_recipe_to_day);

module.exports = router;
