type keyInput = "up" | "down" | "left" | "right";

enum direction {
  Up,
  Down,
  Left,
  Right,
}

function doSomething(keypressed: direction) {
  //do something
}

doSomething(direction.Up);
doSomething(direction.Left);
console.log(direction.Up);
console.log(direction.Down);


//generic
function printFirst<T>(arg: T[]){
    return arg[0];
}

console.log(printFirst<string>(["pranay", "hello"]));
console.log(printFirst<number>([200, 300]))