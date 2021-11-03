//document.getElementById and document.getElementByClassName are used to select
//elements from webpage by Ids and Classes respectively.
//However document.querySelector is used to select elements based on class, Id, element or any other CSS selector.

//select elements from html page
const calcDisplay = document.querySelector("h1")
const inputBtns = document.querySelectorAll("button")
const clearBtn = document.getElementById("clear-btn")

//Calculate first and second value depending on operators
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber
}

//create global variables and it will be changing hence use 'let'
let firstValue = 0
let operatorValue = ""
let awaitingNextValue = false

function sendNumberValue(number) {
  //Replace current display value if first value is entered
  if (awaitingNextValue) {
    calcDisplay.textContent = number
    awaitingNextValue = false
  } else {
    //If current display value is 0, replace it, if not add number
    const displayValue = calcDisplay.textContent
    calcDisplay.textContent =
      displayValue === "0" ? number : displayValue + number
  }
}

function addDecimal() {
  //If operator pressed, dont add decimal
  if (awaitingNextValue) {
    return
  }
  //if no decimal, add one
  if (!calcDisplay.textContent.includes(".")) {
    calcDisplay.textContent = `${calcDisplay.textContent}.`
  }
}

function useOperator(operator) {
  //Number() is used to convert a string or other value to the Number Type
  const currentValue = Number(calcDisplay.textContent)

  //prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator
    return
  }

  //Assign firstValue if no Value
  if (!firstValue) {
    firstValue = currentValue
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue)
    calcDisplay.textContent = calculation
    firstValue = calculation
  }
  awaitingNextValue = true
  operatorValue = operator
}

//Reset all values, calcDisplay
function resetAll() {
  firstValue = 0
  operatorValue = ""
  awaitingNextValue = false
  calcDisplay.textContent = "0"
}

//Add Events Listeners for numbers, operators, decimal Buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value))
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value))
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal())
  }
})

clearBtn.addEventListener("click", resetAll)
