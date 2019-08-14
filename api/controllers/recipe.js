const mongoose = require("mongoose");
const Recipe = require("../models/recipe");
const User = require("../models/user");

exports.add_recipe = (req, res, next) => {
  const email = req.body.email;
  const recipe = new Recipe({
    _id: mongoose.Types.ObjectId(),
    updatedDate: new Date(),
    name: req.body.name,
    externalSource: req.body.externalSource,
    calories: Number(req.body.calories),
    carbs: Number(req.body.carbs),
    protein: Number(req.body.protein),
    fats: Number(req.body.fats)
  });

  User.findOne({email: email})
    .exec()
    .then(user => {
      recipe
        .save()
        .then(result => {     
          user.recipes.push(result);
          user.save().then(
            res.status(200).json({
              message: "Recipe added!",
              recipe: recipe._id
            })
          );
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "Unable to add recipe to current profile",
            error: err
          });
        });
    }).catch(err => {
      res.status(500).json({
        message: "Unable to add recipe to current profile",
        error: err
      });
    });
};

exports.get_recipe = (req, res, next) => {
  const id = req.params.recipeId;
  Recipe.findById(id)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        recipe: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Unable to find recipe",
        error: err
      });
    });
};

exports.get_all_recipes = (req, res, next) => {
  const recipeIds = req.body.recipeIds;
  Recipe.find({_id: recipeIds})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        recipe: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Unable to find recipe",
        error: err
      });
    });
};

exports.delete_recipe = (req, res, next) => {
  Recipe.remove({ _id: req.params.recipeId })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Recipe deleted!"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
      console.log(err);
    });
};
