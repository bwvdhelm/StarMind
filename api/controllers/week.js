const mongoose = require("mongoose");
const Week = require("../models/week");
const Day = require("../models/day");
const User = require("../models/user");

exports.add_week = (req, res, next) => {
  const startDate = new Date(req.body.startDate);
  const userId = req.body.userId;
  const week = new Week({
    _id: mongoose.Types.ObjectId(),
    weekNumber: req.body.weekNumber,
    name: req.body.name,
    startDate: startDate,
    endDate: new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 7
    ),
    updatedDate: new Date()
  });
  const monday = new Day({
    _id: mongoose.Types.ObjectId(),
    date: new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    ),
    updatedDate: new Date(),
    name: "monday"
  });
  const tuesday = new Day({
    _id: mongoose.Types.ObjectId(),
    date: new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1
    ),
    updatedDate: new Date(),
    name: "tuesday"
  });
  const wednesday = new Day({
    _id: mongoose.Types.ObjectId(),
    date: new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 2
    ),
    updatedDate: new Date(),
    name: "wednesday"
  });
  const thursday = new Day({
    _id: mongoose.Types.ObjectId(),
    date: new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 3
    ),
    updatedDate: new Date(),
    name: "thursday"
  });
  const friday = new Day({
    _id: mongoose.Types.ObjectId(),
    date: new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 4
    ),
    updatedDate: new Date(),
    name: "friday"
  });
  const saturday = new Day({
    _id: mongoose.Types.ObjectId(),
    date: new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 5
    ),
    updatedDate: new Date(),
    name: "saturday"
  });
  const sunday = new Day({
    _id: mongoose.Types.ObjectId(),
    date: new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 6
    ),
    updatedDate: new Date(),
    name: "sunday"
  });
  const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
  console.log("Week: ", week);
  User.findById(userId)
    .then(user => {
      week
        .save()
        .then(week => {
          Day.insertMany(days)
            .then(days => {
              week.days.push(monday);
              week.days.push(tuesday);
              week.days.push(wednesday);
              week.days.push(thursday);
              week.days.push(friday);
              week.days.push(saturday);
              week.days.push(sunday);
              week
                .save()
                .then(week => {
                  console.log(user);
                  user.weeks.push(week);
                  user
                    .save()
                    .then(result => {
                      res.status(200).json({
                        message: "Successfully added a new week!",
                        week: week._id,
                        monday: monday._id,
                        user: user
                      });
                    })
                    .catch(err => {
                      res.status(500).json({
                        message: "Unable to add week to the user",
                        error: err
                      });
                    });
                })
                .catch(err => {
                  res.status(500).json({
                    message: "Unable to add days to the week",
                    error: err
                  });
                });
            })
            .catch(err => {
              res.status(500).json({
                message: "Unable to create the days",
                error: err
              });
            });
        })
        .catch(err => {
          res.status(500).json({
            message: "Cannot save week",
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        message: "Cannot find user",
        error: err
      });
    });
};

exports.get_week = (req, res, next) => {
  const id = req.params.weekId;
  Week.findById(id)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch(err => {
      res.status(404).json({
        message: "Could not find the week you are looking for",
        error: err
      });
    });
};
