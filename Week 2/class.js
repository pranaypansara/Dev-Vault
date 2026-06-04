const { Agent } = require("http");

class Rectangle {
  //Unlike java, we cannot give the constructor the    same name as the class. It is always constructor.
  constructor(height, width, color) {
    this.height = height;
    this.width = width;
    this.color = color;
  }

  area(){
    return this.height * this.width;
  }

  paint(){
    console.log('Painted with color '+ this.color);
  }
}

const rect = new Rectangle(5,3,'red');
const area = rect.area();
console.log(area)
rect.paint();


//Some classes

const date = new Date();
console.log(date)
console.log(date.getFullYear())

const map = new Map();
map.set('name', 'John');
map.set('age', 30);
console.log(map.get('name'))