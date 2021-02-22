// Met de require() method kan je javascript modules in laden. 
const express = require('express');
const app = express();
const port = 3000;

// statische pagina's
app.use(express.static('public'));

// pug setup
app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));


// pug files 
app.get('/',  (req, res) => {
  res.render('index', { 
    title: 'ActiveTogether',
    results: 126,
    activitys: ['cycling', 'walking', 'jogging', 'fishing'],
    saved: 0,
    groupMembers: "6/20"
  })
})


// 404 pagina 
 app.use(function (req, res, next) {
 res.status(404).send("404 error")
})


// server 
app.listen(port, () => {
console.log(`Example app listening on port ${port}!`)
});













