//Install express server
const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require("path");
const mongoose = require("mongoose");

const app = express();

const userRoutes = require('./api/routes/user');
const dayRoutes = require('./api/routes/day');
const weekRoutes = require('./api/routes/week');
const recipeRoutes = require('./api/routes/recipe');

// Setup connection to mongoDB
// const uri = "mongodb+srv://bwvdhelm:BlueBerry2064@mealhub-uz0yp.gcp.mongodb.net/mealhub?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/mealhub"
// const uri =  "mongodb://bwvdhelm:" + process.env.MONGO_DB_PW + "@mealhub-uz0yp.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, dbName: 'mealhub', socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30 })
  .then(res => console.log("succesfully connected"))
  .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);

// Using middleware
// app.use(express.static(path.join(__dirname, "/dist/MealHub")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Setting up CORS and allowed methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Configure different endpoints
app.use("/user", userRoutes);
app.use("/recipe", recipeRoutes);
app.use("/week", weekRoutes);
app.use("/day", dayRoutes);

// Catch all routes and direct to index
// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

// Setup error handling, if none of above routes function
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started! Listening at ${port}`))

module.exports = app;
