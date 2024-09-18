
const display = document.getElementById('display');
    const expression = document.getElementById('expression');
    const buttons = document.querySelectorAll('.buttons button');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;

            if (value === 'C') {
                clearDisplay();
            } else if (isOperator(value)) {
                handleOperator(value);
            } else if (value === '=') {
                handleEquals();
            } else {
                handleNumber(value);
            }
        });
    });

    function isOperator(value) {
        return value === '/' || value === '*' || value === '-' || value === '+';
    }

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = '';
        display.innerText = '0';
        expression.innerText = '';
    }

    function handleOperator(value) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            currentInput = evaluate(previousInput, currentInput, operator);
            display.innerText = currentInput;
        }
        operator = value;
        expression.innerText = `${currentInput} ${operator}`;
        previousInput = currentInput;
        currentInput = '';
    }

    function handleEquals() {
        if (currentInput === '' || previousInput === '') return;
        expression.innerText = `${previousInput} ${operator} ${currentInput} =`;
        currentInput = evaluate(previousInput, currentInput, operator);
        display.innerText = currentInput;
        operator = '';
        previousInput = '';
    }

    function handleNumber(value) {
        if (currentInput.includes('.') && value === '.') return;
        currentInput += value;
        display.innerText = currentInput;
    }

    function evaluate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator) {
            case '+': return (num1 + num2).toString();
            case '-': return (num1 - num2).toString();
            case '*': return (num1 * num2).toString();
            case '/': return (num1 / num2).toString();
            default: return '';
        }
    }