const prevDisplay = document.querySelector("#previous-operation");
const currentDisplay = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor() {
    this.prevDisplay = prevDisplay;
    this.currentDisplay = currentDisplay;
    this.currentOperation = ""; 
  }

  
  addDigit(digit) {
    
    if (digit === "." && this.currentDisplay.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();

  }

  
  processOperation(operator) {

    
    if (this.currentDisplay.innerText === "" && operator !== "C") {
      if (this.prevDisplay.innerText !== "") {
        this.changeOperation(operator);
      }
      return;
    }
    
    let operationResult;
    let previous = Number(this.prevDisplay.innerText.split(" ")[0]);
    let current = Number(this.currentDisplay.innerText);

    switch (operator) {
      case "+":
        operationResult = previous + current;
        this.updateScreen(operationResult, operator, current, previous);
        break;
      case "-":
        operationResult = previous - current;
        this.updateScreen(operationResult, operator, current, previous);
        break;
      case "*":
        operationResult = previous * current;
        this.updateScreen(operationResult, operator, current, previous);
        break;
      case "/":
        operationResult = previous / current;
        this.updateScreen(operationResult, operator, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  
  changeOperation(operator) {
    const Operations = ["*", "-", "+", "/"];

    if (!Operations.includes(operator)) {
      return;
    }
    this.prevDisplay.innerText = this.prevDisplay.innerText.slice(0, -1) + operator;
  }


  updateScreen(
    operationResult = null,
    operator = null,
    current = null,
    previous = null) {
    if (operationResult === null) { 
      this.currentDisplay.innerText += this.currentOperation;
    }
    else {

      if (previous === 0) { 
        operationResult = current;
      }

      
      this.prevDisplay.innerText = `${operationResult} ${operator}`;
      this.currentDisplay.innerText = "";
    }
  }

  processEqualOperator() {
    let operator = this.prevDisplay.innerText.split(" ")[1];
    this.processOperation(operator);
  }

  processClearCurrentOperator() {
    this.currentDisplay.innerText = "";
  }

  
  processClearOperator() {
    this.currentDisplay.innerText = "";
    this.prevDisplay.innerText = "";
  }

  
  processDelOperator() {
    this.currentDisplay.innerText =
      this.currentDisplay.innerText.slice(0, -1);
  }

}

const calc = new Calculator();

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});

const keyboardMap = {
  '0': 'tecla0',
  '1': 'tecla1',
  '2': 'tecla2',
  '3': 'tecla3',
  '4': 'tecla4',
  '5': 'tecla5',
  '6': 'tecla6',
  '7': 'tecla7',
  '8': 'tecla0',
  '9': 'tecla0',
  '+': 'tecla+',
  '-': 'tecla-',
  '/': 'tecla/',
  '*': 'tecla*',
  'Enter': 'equal-btn',
  '.': 'tecla.',
  'Delete':'tecladel',
  'Backspace':'tecladel'
 }

document.addEventListener('keydown', (e) => {
  const tecla = e.key
  document.getElementById(keyMap[tecla]).click();
});



