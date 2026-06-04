//promise based approach: used in async, this class promises us something in future just like setTimeout function

//A promise in javascript is an object that represents the eventual completion or failure of an asynchronous operation. promises are used to handle asynchronous operations more effectively than traditional callback functions.

function callback(){
  console.log("3 seconds have passed")
}

//callback version
setTimeout(callback,3000)



//promise version
  //returns an object of the promise class
function setTimeoutPromisified(ms){
  let p = new Promise(resolve => setTimeout(resolve, ms));
  return p;
}

setTimeoutPromisified(3000).then(callback)//syntactically cleaner than callback version


//Promisified version of readFile
const fs = require('fs');

function readFilePromisified(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) {
        reject(); // ❌ on error
      } else {
        resolve(data); // ✅ on success
      }
    });
  });
}

function callback2(contents) {
  console.log(contents);
}

const p = readFilePromisified('a.txt');
p.then(callback2).catch(function(){
  console.log("error")
})
//just dry run and understand the flow of the code, end me callback2 as the variable resolve kaam krega