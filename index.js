// settings
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
require('dotenv').config()
const { MongoClient } = require('mongodb')

// Mongo connection
let db = null
// funciton connectDB
async function connectDB () {
  // get URL from .env file
  const uri = process.env.DB_URL
  // make connection to database
  const options = { useUnifiedTopology: true }
  const client = new MongoClient(uri, options)
  await client.connect()
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
  })

  // static pages
app.use(express.static('public'))

// pug setup
app.set('view engine', 'pug')

// bodyparser setting
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// rendered page
app.get('/', async (req, res) => {
  let groups = {}
  groups = await db.collection('options').find({}).toArray()
  res.render('index', {
    title: 'ActiveTogether',
    results: groups.length,
    groups: groups
  })
})

// rendered post page
// form method="post"
app.post('/', async (req, res) => {
  // data from database
  let groups = {}
  groups = await db.collection('options').find({}).toArray()
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
    groups: groups
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
