// settings
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const groups = [
  {
    activity: "all",
    distance: 10,
    members: "0-10",
    duration: 1,
  },
  {
    activity: "all",
    distance: 15,
    members: "0-10",
    duration: 3,
  },
  {
    activity: "all",
    distance: 20,
    members: "0-10",
    duration: 2,
  },
  {
    activity: "all",
    distance: 25,
    members: "0-10",
    duration: 2,
  },
  {
    activity: "all",
    distance: 30,
    members: "0-10",
    duration: 1,
  },
  {
    activity: "all",
    distance: 35,
    members: "0-10",
    duration: 3,
  },
  {
    activity: "all",
    distance: 3,
    members: "0-10",
    duration: 50,
  },
  {
    activity: "all",
    distance: 45,
    members: "0-10",
    duration: 1,
  },
];

// static pages
app.use(express.static("public"));

// pug setup
app.set("view engine", "pug");

// bodyparser setting
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// rendered pages (pug)
app.get("/", (req, res) => {
  res.render("index", {
    title: "ActiveTogether",
    results: 126,
    activities: ["cycling", "walking", "jogging", "fishing"],
    saved: 0,
    groupMembers: "6/20",
  });
});

// form method="post"
app.post("/", (req, res) => {
  const filteredGroups = groups.filter(function (group) {
    return group.distance >= Number(req.body.distance);
  });

  res.render("index", {
    title: "ActiveTogether",
    results: filteredGroups.length,
    activities: ["cycling", "walking", "jogging", "fishing"],
    saved: 0,
    groupMembers: "6/20",
    data: filteredGroups,
  });
});

// 404 page
app.use(function (req, res, next) {
  res.status(404).send("404 error");
});

// server with express
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
