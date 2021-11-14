/* functions for calculator */

let add = (x, y) => x + y;

let subtract = (x, y) => x - y;

let multiply = (x, y) => x * y;

let divide = (x , y) => x / y;

let operate = (operator, x ,y) => {
  switch (operator) {
    case '+':
      return add(x, y);
    case '-':
      return subtract(x, y);
    case '*':
      return multiply(x, y);
    case '/':
      return divide(x, y);
  }
}

console.log(operate('/',2,3));


