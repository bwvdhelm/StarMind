const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/user');

/*
 * Parse username and password in order to login
 */
router.post("/login", UserController.login);

/*
 * Create a new user
 */
router.post("/register", UserController.signup);

/*
 * Get a list of all the user ID's and email addresses
 */
router.get("/all", checkAuth, UserController.get_all_users);

/*
 * Get a user
 */
router.get("/:email", checkAuth, UserController.get_users);

/*
 * Deleted a single user by ID
 */
router.delete("/:userId", UserController.delete_user);

module.exports = router;

