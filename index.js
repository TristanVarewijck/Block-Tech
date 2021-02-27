// Met de require() method kan je javascript modules in laden.
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

// mongodb
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Tristanvrw:DB_PASS@firststart.oyitr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// .env 
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})

// statische pagina's
app.use(express.static("public"));

// pug setup
app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

// settings
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// pug files
app.get("/", (req, res) => {
  res.render("index", {
    title: "ActiveTogether",
    results: 126,
    activities: ["cycling", "walking", "jogging", "fishing"],
    saved: 0,
    groupMembers: "6/20",
  });
});

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

// 404 pagina
app.use(function (req, res, next) {
  res.status(404).send("404 error");
});

// server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
