

// Met de require() method kan je javascript modules in laden. 

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/login', (req, res) => {
    res.send('Login into your account')
});

app.get('/about', (req, res) => {
    res.send('The about page')
});

app.get('/filter', (req, res) => {
    res.send('Filter the groups your looking for!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});













