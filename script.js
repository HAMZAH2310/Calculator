var buttonContainer = document.querySelector(".button-container");
var display = document.querySelector("#display");
var resetDisplay = false;
var canCalculate = false;
var tempVal = "";
var operator = "";

buttonContainer.addEventListener("click", function (e) {
  var clickedButton = e.target;
  var buttonValue = clickedButton.innerText;

  if (buttonValue == "C") {
    display.value = "";
  } 
  else if (buttonValue == "<") {
    display.value = display.value.slice(0, -1);
  } 
  else if (buttonValue == "=") {
    if (canCalculate == true) {
      display.value = eval(tempVal + operator + display.value);
      canCalculate = false;
    }
  } 
  else if (clickedButton.classList.contains('operator')) {
    if (canCalculate == true) {
      display.value = eval(tempVal + operator + display.value);
      canCalculate = false;
    }

    tempVal = display.value;
    operator = buttonValue;
    resetDisplay = true;
  } 
  else {
    if (resetDisplay == true) {
      display.value = buttonValue;
      resetDisplay = false;
      canCalculate = true;
    } else {
      display.value = display.value + buttonValue;
    }
  }
});
