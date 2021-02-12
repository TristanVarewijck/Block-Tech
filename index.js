// Met de require() method kan je javascript modules in laden. 
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

router.get("/", function(req, res) {
    res.send('index');
})


// statische pagina's 
// app.use(express.static('public')) 

// Pagina's 
// app.get('/', (req, res) => {
 // res.send('Hello World!')
// });

// 404 pagina 
// app.use(function (req, res, next) {
 //   res.status(404).send("404 error")
//})


// server 
//app.listen(port, () => {
 // console.log(`Example app listening on port ${port}!`)
//});













