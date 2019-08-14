const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const RecipeController = require('../controllers/recipe') 


/*
 * Create a new recipe from scratch and add it to current user
 */
router.post("/add", checkAuth, RecipeController.add_recipe);

/*
 * Get one specific recipe
 */
router.get("/:recipeId", checkAuth, RecipeController.get_recipe);

/*
 * Get all recipes from user
 */
 router.post("/all", checkAuth, RecipeController.get_all_recipes);

/*
 * Deleted a recipe by ID
 */
router.delete("/:recipeId", checkAuth, RecipeController.delete_recipe);

module.exports = router;
