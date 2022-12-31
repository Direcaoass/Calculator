const prevDisplay = document.querySelector("#previous-operation");
const currentDisplay = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculadora {
  constructor() {
    this.prevDisplay = prevDisplay;
    this.currentDisplay = currentDisplay;
    this.currentOperation = ""; // é o digito que está sendo pressionado no exato momento.
  }

  // adiciona um digito a tela
  addDigit(digit) {
    // Verifica se o numero digitado é um ponto, para evitar repetição.
    if (digit === "." && this.currentDisplay.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();

  }

  // Processa a operação de acordo com o botão apertado enviado no parametro operador
  processOperation(operator) {

    //Verifica condições para apenas mudar o sinal do operador
    if (this.currentDisplay.innerText === "" && operator !== "C") {
      if (this.prevDisplay.innerText !== "") {
        this.changeOperation(operator);
      }
      return;
    }
    //Calcula o resultado da operação
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

  // Muda o sinal matematico da operação no prevdisplay.
  changeOperation(operator) {
    const Operations = ["*", "-", "+", "/"];

    if (!Operations.includes(operator)) {
      return;
    }
    this.prevDisplay.innerText = this.prevDisplay.innerText.slice(0, -1) + operator;
  }


  // Atualiza os valores do display e da operação
  // Esses parametros apenas recebem valor, quando o metodo processOperation for utilizado.
  updateScreen(
    operationResult = null,
    operator = null,
    current = null,
    previous = null) {
    if (operationResult === null) { //apenas adiciona os digitos pois não tem dados para calcular resultado
      this.currentDisplay.innerText += this.currentOperation;
    }
    else {// qnd é inserido um operador, mesmo sem um previous, ele vem pra cá.

      if (previous === 0) { // apenas adiciona no segundo display pois nao tem dados para calcular resultado
        operationResult = current;
      }

      //atualiza os displays com os dados obtidos no metodo processOperation
      this.prevDisplay.innerText = `${operationResult} ${operator}`;
      this.currentDisplay.innerText = "";
    }
  }

  // Processa resultado do botão igual
  processEqualOperator() {
    let operator = this.prevDisplay.innerText.split(" ")[1];
    this.processOperation(operator);
  }

  // Limpa o display atual
  processClearCurrentOperator() {
    this.currentDisplay.innerText = "";
  }

  // Limpa os 2 displays
  processClearOperator() {
    this.currentDisplay.innerText = "";
    this.prevDisplay.innerText = "";
  }

  // Deleta o ultimo digito
  processDelOperator() {
    this.currentDisplay.innerText =
      this.currentDisplay.innerText.slice(0, -1);
  }

}

const calc = new Calculadora();

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

const mapaTeclado = {
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
  document.getElementById(mapaTeclado[tecla]).click();
});



