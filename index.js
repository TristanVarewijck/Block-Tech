// Met de require() method kan je javascript modules in laden. 
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const pug = require('pug') 

// pug setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// pug files 
app.get('/',  (req, res) => {
  res.render('index', { title: 'ActiveTogether'})
})

app.get('/',  (req, res) => {
  res.render('filter', { 
    title: 'Filter' })
})

// statische pagina's 
 app.use(express.static('public')) 

// Pagina's 
 app.get('/filter', (req, res) => {
 res.send('Hello World!')
 });

// 404 pagina 
 app.use(function (req, res, next) {
 res.status(404).send("404 error")
})


// server 
app.listen(port, () => {
console.log(`Example app listening on port ${port}!`)
});













