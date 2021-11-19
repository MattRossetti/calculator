/* functions for calculator */

let add = (x, y) => x + y;

let subtract = (x, y) => x - y;

let multiply = (x, y) => x * y;

let divide = (x, y) => x / y;

let operate = (x, y, operatorCharCode) => {
  switch (operatorCharCode) {
    case 43:
      return add(x, y);
    case 8722:
      return subtract(x, y);
    case 215:
      return multiply(x, y);
    case 247:
      return divide(x, y);
  }
}

let onClick = (e) => {
  console.log(this)
}

let clickEffect = (e) => {
  e.classList.add('clicked');
  e.classList.remove('shaded');
  sleep(100).then(() => {
    e.classList.remove('clicked')
    if (e.classList.contains('number-button')) return;
    e.classList.add('shaded')
  })
}

let clear = () => {
  calcArray[0] = '';
  calcArray[1] = '';
  calcArray[2] = '';
}

let handleEquals = () => {
  const x = parseInt(calcArray[1]);
  const y = parseInt(calcArray[0]);
  const operatorCharCode = calcArray[2].charCodeAt(0);
  const result = operate(x, y, operatorCharCode);
  calcArray[0] = result;
  calcArray[1] = '';
  calcArray[2] = ''
  
}

let handleClick = (e) => {
  clickEffect(e)

  if (e.id === 'clear-button') {
    clear();
  }
  else if (e.classList.contains('number-button')) {
    calcArray[0] += e.textContent;
  }
  else if (e.id === 'decimal-button') {
    if (calcArray[0].includes('.')) return;
    else calcArray[0] += e.textContent;
  }
  else if (e.id === 'backspace-button') {
    calcArray[0] = calcArray[0].substring(0, calcArray[0].length - 1)
  }
  else if (e.classList.contains('operator-button')){
    calcArray[1] = calcArray[0];
    calcArray[0] = '';
    calcArray[2] = e.textContent;
  }
  else if (e.id === 'equals-button') {
    handleEquals();
  }
  console.log(calcArray)
}



let sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}


/***** Script *****/

const allButtons = document.querySelectorAll('button')
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
// const decimalButton = document.querySelector('#decimal-button');
const calcArray = ['', '', ''];

for (const button of allButtons) {
  button.addEventListener('click', (e) => {
    handleClick(button);
  })
}






