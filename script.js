let firstNumber;
let secondNumber;
let operator;


function add (a, b){
    return a + b;
}
function subtract (a, b){
    return a - b;
}
function multiply (a, b){
    return a * b;
}
function divide (a, b){
    return a / b;
}
function operate (a, operator, b){
    switch (operator){
        case "+":
            add(a,b);
            break;
        case "-":
            subtract(a,b);
            break;
        case "x":
            multiply(a,b);
            break;
        case "&divide":
            divide(a,b);
            break;
    }
}