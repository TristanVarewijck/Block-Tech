// settings
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const { MongoClient } = require('mongodb')
let PORT = process.env.PORT || 3000;

// Mongo connection
let db = null
let filter;
// funciton connectDB
async function connectDB() {
  // get URL from .env file
  const uri = process.env.DB_URI
  // make connection to database
  const options = { useUnifiedTopology: true }
  const client = new MongoClient(uri, options)
  await client.connect();
  db = await client.db(process.env.DB_NAME)
  filter = db.collection('filter'); 
  
}
connectDB()
   try {
    // if succesfull connection is made, show a message
    console.log('we have a connection to Mongo!')
  } catch (error) {
    // if connection is unsuccesful, show errors
    console.log(error)
  }


// static pages
app.use(express.static('public'))

// pug setup
app.set('view engine', 'pug')

// bodyparser setting
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// rendered page
app.get('/', async (req, res) => {
  let groups = {}
  let filterDB;
  // let filterDB = {}; 
	// filterDB = await filter.findOne({}, { sort: { _id: -1 }, limit: 1 });
  groups = await db.collection('options').find({}).toArray()
  res.render('index', {
    title: 'ActiveTogether',
    results: groups.length,
    groups,
    filterDB
  })
})

// rendered post page
// form method="post"
app.post('/', async (req, res) => {
  // data from database
  let groups = {}
  groups = await db.collection('options').find({}).toArray()

  let filterDB = {}
  filterDB = await filter.findOne({}, { sort: { _id: -1 }, limit: 1 });
	
		try {
			const document = { 'activity': req.body.activity, 'distance': req.body.distance, 'attendence': req.body.attendence, 'duration': req.body.duration };
      if(await filter.countDocuments() > 0) {
         await filter.updateOne({}, {$set: { document }});
      }
      else{
        await filter.insertOne({ document });
      }
			filterDB = await filter.findOne({}, { sort: { _id: -1 }, limit: 1 });
		}
		catch (error) {
			console.error('Error:', error);
		}

  // filter criteria
  if (req.body.activity !== 'all') {
    groups = groups.filter(group => { return group.activity === req.body.activity })
  }
  if (req.body.distance !== 'all') {
    groups = groups.filter(group => { return group.distance <= req.body.distance })
  }
  if (req.body.attendence !== 'all') {
    groups = groups.filter(group => { return group.attendence <= req.body.attendence })
  }
  if (req.body.duration !== 'all') {
    groups = groups.filter(group => { return group.duration <= req.body.duration })
  }


  res.render('index', {
    title: 'ActiveTogether',
    results: groups.length,
    groups,
    filterDB
  })
})

// 404 page
app.use(function (req, res, next) {
  res.status(404).send('404 error')
})

// server with express
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
