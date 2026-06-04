import chalk from 'chalk'; // modern import syntax to use an external library
const fs = require("fs"); // old way to use an external library

console.log(chalk.blue('Hello World'));

// fs.readFile("a.txt", function(err, data){
//     console.log(data);
// })