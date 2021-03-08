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
app.get("/", async (req, res) => {
  let groups = {}
  groups = await db.collection('options').find({}).toArray();
  res.render("index", {
    title: "ActiveTogether",
    results: groups.length,
    groups: groups
  });
});

// form method="post"
  app.post("/", async (req, res) => {
  // data from database 
  let groups = {}
  groups = await db.collection('options').find({}).toArray();
    const filteredGroups = groups.filter(function (group) {
    return group.activity == String(req.body.activity) 
    && group.distance <= Number(req.body.distance)
    && group.duration <= Number(req.body.duration)
    && group.attendence <= Number(req.body.attendence)
  });

  res.render("index", {
    title: "ActiveTogether",
    results: filteredGroups.length,
    groups: filteredGroups,
  });
});
    
    /*if(req.body.activity !== 'all'){
      groups = groups.filter(group => {return group.activity === String(req.body.activity)})
    }

    if(req.body.distance !== 'all'){
      groups = groups.filter(group => {return group.distance === Number(req.body.distance)})
    }

    if(req.body.attendence !== 'all'){
      groups = groups.filter(group => {return group.attendence === Number(req.body.attendence)})
    }

    if(req.body.duration !== 'all'){
      groups = groups.filter(group => {return group.duration === Number(req.body.duration)})
    };
    
    res.render("index", {
      title: "ActiveTogether",
      results: filteredGroups.length,
      groups: filteredGroups,
    });
  });*/ 

   /*const filteredGroups = groups.filter(function (group) {
    return group.activity == String(req.body.activity) 
    && group.distance <= Number(req.body.distance)
    && group.duration <= Number(req.body.duration)
    && group.attendence <= Number(req.body.attendence)
  }); */

  /*if(req.body.activitiy !== 'all'){
    groups = groups.filter(group => {return group === req.body.activity})
  }
  if(req.body.distance !== 'all'){
    groups = groups.filter(group => {return group === req.body.distance})
  } */ 

  
/*const firstFiltered = filterArray(groups, req.body.activity)
const secondFiltered = filterArray(firstFiltered, req.body.distance)
const thirdFiltered = filterArray(secondFiltered, req.body.attendance)
const filteredGroups = filterArray(thirdFiltered, req.body.duration)
console.log(filteredGroups)
function filterArray(array, filtering){
  if(filtering !== 'all'){
    return array.filter(item => {return item === filtering})
  }
  return array
}
*/ 


// 404 page
app.use(function (req, res, next) {
  res.status(404).send("404 error");
});

// server with express
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
