const screen = document.querySelector("#screen");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");
const decimalButton = document.querySelector("#decimal");

let isFloat = false;
let signOn = false;
let firstNumber = "";
let operator = "";
let secondNumber = "";
let result = "";

const allClear = () => {
    isFloat = false;
    signOn = false;
    firstNumber = "";
    operator = "";
    secondNumber = "";
    result = "";
    screen.value = "0";
};

const calculate = () => {
    if (operator && result === "" && ![" ", "+", "-", "."].includes(screen.value[screen.value.length - 1])) {
        secondNumber = screen.value.substring(firstNumber.length + 3);

        switch (operator) {
            case "+":
                result = Number((Number(firstNumber) + Number(secondNumber)).toFixed(3));
                break;
            case "-":
                result = Number((Number(firstNumber) - Number(secondNumber)).toFixed(3));
                break;
            case "*":
                result = Number((Number(firstNumber) * Number(secondNumber)).toFixed(3));
                break;
            case "/":
                result = Number((Number(firstNumber) / Number(secondNumber)).toFixed(3));
                break;
            default:
        }
        screen.value = result;
    }
};

clear.addEventListener("click", allClear);

document.querySelectorAll(".number").forEach((numberButton) => {
    numberButton.addEventListener("click", () => {
        if (screen.value === "0") {
            screen.value = numberButton.textContent;
        } else if ([" 0", "+0", "-0"].includes(screen.value.substring(screen.value.length - 2))
                && numberButton.textContent === "0") {
        } else if ([" 0", "+0", "-0"].includes(screen.value.substring(screen.value.length - 2))
                && numberButton.textContent !== "0") {
            screen.value = screen.value.substring(0, screen.value.length - 1) + numberButton.textContent;
        } else if (result || result === 0) {
            allClear();
            screen.value = numberButton.textContent;
        } else {
            screen.value += numberButton.textContent;
        }
    });
});

decimalButton.addEventListener("click", () => {
    if (result || result === 0) {
        allClear();
        isFloat = true;
        screen.value += ".";
    } else if (!isFloat) {
        isFloat = true;
        if ([" ", "+", "-"].includes(screen.value[screen.value.length - 1])) {
            screen.value += "0.";
        } else {
            screen.value += ".";
        }
    }
});

document.querySelectorAll(".operator").forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        if (result || result === 0) {
            isFloat = false;
            signOn = false;
            firstNumber = String(result);
            operator = operatorButton.dataset.operator;
            result = "";
            screen.value = `${firstNumber} ${operatorButton.textContent} `;
        } else if (operator && ![" ", "+", "-", "."].includes(screen.value[screen.value.length - 1])) {
            calculate();
            isFloat = false;
            signOn = false;
            firstNumber = String(result);
            operator = operatorButton.dataset.operator;
            result = "";
            screen.value = `${firstNumber} ${operatorButton.textContent} `;
        } else if (!operator) {
            isFloat = false;
            firstNumber = screen.value;
            operator = operatorButton.dataset.operator;
            screen.value += ` ${operatorButton.textContent} `;
        } else if (!signOn
                && !["*", "/"].includes(operatorButton.dataset.operator)
                && screen.value[screen.value.length - 1] === " ") {
            signOn = true;
            screen.value += operatorButton.textContent;
        }
    });
});

equalsButton.addEventListener("click", calculate);
