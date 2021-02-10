// Met de require() method kan je javascript modules in laden. 

const express = require('express');
const app = express();
const port = 3000;


// statische pagina's 
app.use(express.static('public')) 

// Pagina's 
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/login', (req, res) => {
    res.send('Login into your account')
});

app.get('/about', (req, res) => {
    res.send('The about page')
});


// 404 pagina 
app.use(function (req, res, next) {
    res.status(404).send("404 error")
})


// server 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});













