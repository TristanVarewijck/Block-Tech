// settings
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config()
const { MongoClient } = require('mongodb');

// connect to mongoDB 
// Replace the following with your Atlas connection string

/*const atlasUrl = process.env.DB_URL; 
const client = new MongoClient(atlasUrl);
async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
*/

let db = null 
// funciton connectDB
async function connectDB (){
  // get URL from .env file
  const uri = process.env.DB_URL
  // make connection to database
  const options = {useUnifiedTopology: true};
  const client = new MongoClient(uri, options)
  await client.connect(); 
  db = await client.db(process.env.DB_NAME)
}
connectDB() 
 .then(() => { 
   // if succesfull connection is made, show a message
  console.log('we have a connection to Mongo!')
})
 .catch(error => {
   // if connection is unsuccesful, show errors
  console.log(error)
  
});



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
app.post("/", async (req, res) => {
  
  // data from database 
  let groups = {}
  groups = await db.collection('options').find({}).toArray();
  
  // filter criteria 
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
    groups
  });
});


// 404 page
app.use(function (req, res, next) {
  res.status(404).send("404 error");
});

// server with express
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
