var buttonContainer = document.querySelector(".button-container");
var display = document.querySelector("#display");
var operationDisplay = document.querySelector("#operation");
var resetDisplay = false;
var canCalculate = false;
var tempVal = "";
var operator = "";
var displayOperator = "";

function getOperatorSymbol(buttonValue) {
  if (buttonValue === "x") return "*";
  if (buttonValue === "÷") return "/";
  return buttonValue;
}

function calculate(firstOperand, operator, secondOperand) {
  firstOperand = parseFloat(firstOperand);
  secondOperand = parseFloat(secondOperand);
  
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      if (secondOperand === 0) {
        return "Error";
      }
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

buttonContainer.addEventListener("click", function (e) {
  var clickedButton = e.target;
  var buttonValue = clickedButton.innerText || clickedButton.querySelector("i")?.classList[1] || "";

  if (!clickedButton.classList.contains("button")) return;

  if (buttonValue == "C") {
    display.value = "0";
    operationDisplay.innerText = "";
    tempVal = "";
    operator = "";
    canCalculate = false;
    resetDisplay = false;
  } 
  else if (buttonValue == "<" || buttonValue == "fa-delete-left") {
    if (display.value.length > 1) {
      display.value = display.value.slice(0, -1);
    } else {
      display.value = "0";
    }
    updateOperationDisplay();
  } 
  else if (buttonValue == "=") {
    if (canCalculate && tempVal && operator) {
      let result = calculate(tempVal, operator, display.value);
      display.value = result;
      operationDisplay.innerText = tempVal + " " + displayOperator + " " + display.value + " =";
      canCalculate = false;
      tempVal = result;
      resetDisplay = true;
    }
  } 
  else if (clickedButton.classList.contains('operator')) {
    if (canCalculate && tempVal && operator) {
      let result = calculate(tempVal, operator, display.value);
      display.value = result;
      tempVal = result;
    } else {
      tempVal = display.value;
    }
    operator = getOperatorSymbol(buttonValue);
    displayOperator = buttonValue;
    resetDisplay = true;
    canCalculate = true;
    updateOperationDisplay();
  } 
  else {
    if (buttonValue === "." && display.value.includes(".")) {
      return; // Mencegah lebih dari satu titik desimal
    }
    if (resetDisplay || display.value === "0") {
      display.value = buttonValue === "." ? "0." : buttonValue;
      resetDisplay = false;
    } else {
      display.value += buttonValue;
    }
    updateOperationDisplay();
  }
});

function updateOperationDisplay() {
  if (tempVal && operator && canCalculate) {
    if (!resetDisplay) {
      operationDisplay.innerText = tempVal + " " + displayOperator + " " + display.value;
    } else {
      operationDisplay.innerText = tempVal + " " + displayOperator;
    }
  } else {
    operationDisplay.innerText = display.value;
  }
}