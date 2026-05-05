let firstNumber = "";
let secondNumber = "";
let operator = "";
const display = document.querySelector("#display");
const numButtons = document.querySelector("#numbers");
const symButtons = document.querySelector("#symbols");
const KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "/", "Enter", "-", "x", "=", "Delete", "."];

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
        firstNumber = button;
    } else {
        firstNumber += button;
    }
    displayText();
}

function updateOperator(symbol) {
    if (symbol === "back") {
        operator = "";
        displayText();
        return;
    }
    if (firstNumber !== ".") {
        operator = symbol;
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
        secondNumber = button;
    } else {
        secondNumber += button;
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
    const content = event.target.textContent;
    if (event.target.matches(".buttons")) {
        if (!operator) {
            updateFirstNumber(content);
        } else {
            updateSecondNumber(content);
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
        updateOperator(event.target.textContent);
    }
    if (event.target.matches("#equals")) {
        equals();
    }
    if (event.target.matches("#clear")) {
        clear();
    }
});
document.addEventListener("keydown", event => {
    const key = event.key;
    if (event.shiftKey) {
        if (event.key === "+") {
            updateOperator("+");
        }
        if (event.key === "*") {
            updateOperator("x");
        }
    }
    if (KEYS.includes(key)) {
        switch (key) {
            case "Backspace":
                backspace();
                break;
            case "Enter": case "=":
                equals();
                break;
            case "Delete":
                clear();
                break;
            case "-":
                updateOperator("\u2212");
                break;
            case "x":
                updateOperator("x");
                break;
            case "/":
                updateOperator("\u00f7");
                break;
            case ".":
                decimal();
                break;
            default:
                if (!operator) {
                    updateFirstNumber(key);
                } else {
                    updateSecondNumber(key);
                }
                break;
        }
    }
});