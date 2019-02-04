const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

// register Middleware

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

// Home page
app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my private website."
  });

  // res.send("<h1>Hello Express!</h1>");
  // res.send({
  //   name: "Jürgen",
  //   likes: ["Biking", "Guitar playing", "Reading"]
  // });
});

// route /about
app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

// route /projects
app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects"
  });
});

// /bad - send back json with errorMessage
app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to handle request."
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
