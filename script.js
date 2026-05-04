let firstNumber;
let secondNumber;
let operator;
const display = document.querySelector("#display");
const numButtons = document.querySelector("#numbers");
const symButtons = document.querySelector("#symbols");

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(a, operator, b) {
    switch (operator) {
        case "+":
            return add(+a, +b);
            break;
        case "\u2212":
            return subtract(+a, +b);
            break;
        case "x":
            return multiply(+a, +b);
            break;
        case "\u00f7":
            return divide(+a, +b);
            break;
    }
}
function updateFirstNumber(button) {
    firstNumber = button.textContent;
    display.textContent = firstNumber;
}

function updateOperator(button) {
    operator = button.textContent;
    display.textContent = firstNumber + " " + operator;
}

function updateSecondNumber(button) {
    secondNumber = button.textContent;
    display.textContent = firstNumber + " " + operator + " " + secondNumber;
}

numButtons.addEventListener("click", event => {
    if (event.target.matches(".buttons")) {
        if (!firstNumber || !operator) {
            updateFirstNumber(event.target);
            console.log(event.target.textContent);
        } else {
            updateSecondNumber(event.target);
            console.log(event.target.textContent);
        } 
    }
});
symButtons.addEventListener("click", event => {
    if (event.target.matches(".buttons") && firstNumber) {
        updateOperator(event.target);
        console.log(event.target.textContent);
    }
    if (event.target.matches("#equals")){
        if (firstNumber && operator && secondNumber){
            let answer = operate(firstNumber, operator, secondNumber);
            display.textContent = answer;
            firstNumber = answer;
            secondNumber = null;
            operator = null;
        }
    }
    if (event.target.matches("#clear")){
        display.textContent = "";
        firstNumber = null;
        secondNumber = null;
        operator = null;
    }  
});