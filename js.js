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
  calcArray[2] = '';
}

let handleEquals = () => {
  const x = parseFloat(calcArray[1]);
  const y = parseFloat(calcArray[0]);
  const operatorCharCode = calcArray[2].charCodeAt(0);
  calcArray[3] = operate(x, y, operatorCharCode);
}

// let resetCalcArray = (e) => {
//   calcArray[0] = String(calcArray[3]);
//   calcArray[1] = '';
//   if (e.id === 'equals-button') calcArray[2] = '';
//   else calcArray[2] = e.textContent
//   calcArray[3] = '';
// }

let resetCalcArray = (e) => {
  if (e.id === 'equals-button') {
    calcArray[0] = String(calcArray[3]);
    calcArray[1] = '';
    calcArray[2] = '';
    calcArray[3] = '';
  }
  else {
    calcArray[0] = '';
    calcArray[1] = String(calcArray[3]);
    calcArray[2] = e.textContent;
    calcArray[3] = '';
  }
}

let calculateOnOperator = (e) => {
  if (!e.classList.contains('operator-button')) return false;;
  if (calcArray[0] != '' && calcArray[1] != '') return true;
  return false;
}

let updateDisplay = (e) => {
  if (e.id === 'equals-button') {    
    if (calcArray[0] === '' || calcArray[1] === '') return;
    subText.innerHTML = `${calcArray[1]} ${calcArray[2]} ${calcArray[0]} = ${calcArray[3]}`;
    mainText.innerHTML = calcArray[3];
    resetCalcArray(e);
  }
  else if (calculateOnOperator(e)) {
    resetCalcArray(e);
    subText.innerHTML = `${calcArray[1]} ${calcArray[2]}`
    mainText.innerHTML = ''
  }
  else {
    mainText.innerHTML = calcArray[0];
    subText.innerHTML = `${calcArray[1]} ${calcArray[2]}`;
  }
}

let calculateDecision = (e) => {
  if (e.id === 'equals-button') return true;
  else if (e.classList.contains('operator-button')){
    if (calcArray[0] != '' && calcArray[1] != '') {
      return true;
    };
  }
  return false;
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
    if (calcArray[0] != '' && calcArray[1] != '') {
      'pass'
    }
    else if (calcArray[0] != '') {
      calcArray[1] = calcArray[0];
      calcArray[0] = '';
    };
    calcArray[2] = e.textContent;
  }

  if (calculateDecision(e)) {
    handleEquals();
  }
  updateDisplay(e);
  console.log(calcArray)
}

let sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// let findButton = (input) => {
//   [...allButtons].find(e => e.textContent === input)
// }


/***** Script *****/

const allButtons = document.querySelectorAll('button')
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const addButton = document.querySelector('#add-button');
const subtractButton = document.querySelector('#subtract-button');
const multiplyButton = document.querySelector('#multiply-button');
const divideButton = document.querySelector('#divide-button');
const equalsButton = document.querySelector('#equals-button')
const mainText = document.querySelector('.main-text');
const subText = document.querySelector('.sub-text');
const calcArray = ['', '', '', ''];

for (const button of allButtons) {
  button.addEventListener('click', (e) => {
    handleClick(button);
  })
}

window.addEventListener('keydown', (e) => {
  e.preventDefault();
  const input = e.key
  if (input === '+') {
    addButton.click();
  }
  if (input === '-') {
    subtractButton.click();
  }
  if (input === '/') {
    divideButton.click();
  }
  if (input === '*') {
    multiplyButton.click(); 
  }
  console.log('yes')
  if (input ==='Enter') {
    equalsButton.click();
  }
  try{
    const button = [...allButtons].find(e => e.textContent === input)
    button.click();
  } catch (e){
    'pass'
  }
})






