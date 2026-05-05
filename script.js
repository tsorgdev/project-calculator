let firstNumber = "";
let secondNumber = "";
let operator = "";
const display = document.querySelector("#display");
const numButtons = document.querySelector("#numbers");
const symButtons = document.querySelector("#symbols");

function add(a, b) {
    return Math.round((a + b) * 100) / 100;
}
function subtract(a, b) {
    return Math.round((a - b) * 100) / 100;
}
function multiply(a, b) {
    return Math.round(a * b * 100) / 100;
}
function divide(a, b) {
    if (a === 0 || b === 0) {
        return "ERROR";
    }
    return Math.round(a / b * 100) / 100;
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
    if (button === "back") {
        firstNumber = firstNumber.slice(0, -1);
        displayText();
        return;
    }
    if (button === ".") {
        firstNumber += button;
        displayText();
        return;
    }
    if (!firstNumber || firstNumber === "0" || firstNumber === "ERROR") {
        firstNumber = button.textContent;
    } else {
        firstNumber += button.textContent;
    }
    displayText();
}

function updateOperator(button) {
    if (button === "back") {
        operator = "";
        displayText()
        return;
    }
    if (firstNumber !== ".") {
        operator = button.textContent;
        displayText();
    }
}

function updateSecondNumber(button) {
    if (button === "back") {
        secondNumber = secondNumber.slice(0, -1);
        displayText();
        return;
    }
    if (button === ".") {
        secondNumber += button;
        displayText();
        return;
    }
    if (!secondNumber || secondNumber === "0") {
        secondNumber = button.textContent;
    } else {
        secondNumber += button.textContent;
    }
    displayText();
}

function displayText() {
    const message = firstNumber + " " + operator + " " + secondNumber;
    if (message.length <= 11) {
        display.textContent = message;
    }
}

function backspace() {
    if (secondNumber) {
        updateSecondNumber("back");
    } else if (operator) {
        updateOperator("back");
    } else if (firstNumber) {
        updateFirstNumber("back");
    } else {
        return;
    }
}

function decimal() {
    if (secondNumber && !secondNumber.includes(".")) {
        updateSecondNumber(".");
    } else if (operator) {
        updateSecondNumber(".");
    } else if (!firstNumber.includes(".")) {
        updateFirstNumber(".");
    } else {
        return;
    }
}
function equals() {
    if (firstNumber && operator && secondNumber && (secondNumber !== ".")) {
        firstNumber = operate(firstNumber, operator, secondNumber) + "";
        secondNumber = "";
        operator = "";
        displayText();
    }
}
function clear() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    displayText();
}

numButtons.addEventListener("click", event => {
    if (event.target.matches(".buttons")) {
        if (!operator) {
            updateFirstNumber(event.target);
        } else {
            updateSecondNumber(event.target);
        }
    }
    if (event.target.matches("#back")) {
        backspace();
    }
    if (event.target.matches("#decimal")) {
        decimal();
    }
});
symButtons.addEventListener("click", event => {
    if (event.target.matches(".buttons") && firstNumber) {
        updateOperator(event.target);
    }
    if (event.target.matches("#equals")) {
        equals();
    }
    if (event.target.matches("#clear")) {
        clear();
    }
});