const Day = require("../models/day");
const Recipe = require('../models/recipe');

exports.get_day = (req, res, next) => {
    const id = req.params.dayId;
    Day.findById({ _id: id })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json({ result });
      })
      .catch(err => {
        res.status(404).json({
          message: "Could not find the day you are looking for",
          error: err
        });
      });
  }

exports.add_recipe_to_day = (req, res, next) => {
    const dayId = req.body.dayId;
    const recipeId = req.body.recipeId;
  
    Day.findById(dayId)
      .exec()
      .then(day => {
        Recipe.findById(recipeId)
          .exec()
          .then(recipe => {
              console.log('Day found!');
            day.recipes.push(recipe);
            day
              .save()
              .then(result => {
                res.status(200).json({
                  message: "Succesfully added recipe to current day"
                });
              })
              .catch(err => {
                res.status(500).json({
                    message: 'cannot push',
                  error: err
                });
              });
          })
          .catch(err => {
            res.status(500).json({
              message: 'cannot find recipe',
              error: err
            });
          });
      })
      .catch(err => {
        res.status(500).json({
          message: 'cannot find day',
          error: err
        });
      });
  }