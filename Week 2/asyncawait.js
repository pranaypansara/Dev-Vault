//Trying to run one async function after the previous one has completed

//Without Promise (Callback hell)
setTimeout(function(){
  console.log("hi")
  setTimeout(function(){
    console.log("hello")
    setTimeout(function(){
      console.log("bye")
    },1000)
  },1000)
},3000)


//With Promise (Promise chaining)
function setTimeoutPromisified(ms){
  return new Promise(function(resolve){
    setTimeout(resolve, ms)
  })
}
setTimeoutPromisified(3000).then(function(){
  console.log("hi")
  return setTimeoutPromisified(1000)
}).then(function(){
  console.log("hello")
  return setTimeoutPromisified(1000)
}).then(function(){
  console.log("bye")
})


//Async Await: way to write async code that looks and behaves like sync code. It is just syntactic sugar over promises(promise chaining in this case).
async function solve(){
  await setTimeoutPromisified(3000)
  console.log("hi")
  await setTimeoutPromisified(1000)
  console.log("hello")
  await setTimeoutPromisified(1000)
  console.log("bye")
}
solve();