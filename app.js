

// Met de require() method kan je javascript modules in laden. Voor als je bijvoorbeeld een node.js 
// applicatie wilt maken.

const express = require("express");
const log = console.log; 
const chalk = require('chalk');
const server = express();

log(chalk.blueBright('Hier is je server....'));

server.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
server.listen(3000, function () {
    log("Server is running on: localhost3000");
});














