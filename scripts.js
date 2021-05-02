function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if(y == 0 ){
        return "Syntax Error"
    }

    return x / y;
}

function operate(operation, x, y) {
    if(operation == 'add') {
        return add(x, y);
    }
    else if(operation == 'subtract') {
        return subtract(x, y);
    }
    else if(operation == 'multiply') {
        return multiply(x, y);
    }
    else if(operation == 'divide') {
        return divide(x, y);
    }
}

function animateClick(element) {
    element.classList.add('clicked');
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 100)
}

window.addEventListener('load', function() {
    const numbers = document.querySelectorAll('.numbers');
    const display = document.querySelector('#display > p');
    const backspace = document.getElementById('backspace');
    const operators = document.querySelectorAll('.operators');
    let num = 0;
    let operation = "";
    let chosenOperation = "";
    let firstNum = 0;
        
    
    numbers.forEach(number => {
        number.addEventListener('click', () => {
            //max display length of 15
            if(num.toString().length  == 15) { 
                return;
            }
            //Check if operation has value
            if(operation != ""){
                chosenOperation = operation;
                firstNum = display.textContent;
                num = 0;
                operation = "";
            }

            //not 0 and no dot
            if(num != 0 && !display.textContent.includes('.')) { 
                num = num * 10 + parseInt(number.textContent,10);
            }
            //display has 0
            else if(display.textContent.includes('.')) { 
                if(num.toString().includes('.')){
                    return;
                }
                num = ((num * 10) + parseInt(number.textContent,10)) / 10;
            }
            //display is 0
            else { 
                num = parseInt(number.textContent, 10);
            }
            display.textContent = num.toString();
            animateClick(number);
        });
    });

    operators.forEach(operator => {
        operator.addEventListener('click', () => {
            if(operator.textContent == '+') {
                operation = 'add';
            }
            else if (operator.textContent == '-') {
                operation = 'subtract';
            }
            else if (operator.textContent == 'x') {
                operation = 'multiply';
            }
            else if (operator.textContent == '/') {
                operation = 'divide';
            }
            else if (operator.textContent == 'C') {
                num = 0;
                display.textContent = 0;
                animateClick(operator);
            }
            else if (operator.textContent == '.') {
                if(display.textContent.toString().includes('.')) {
                    return;
                }
        
                display.textContent += '.';
                animateClick(operator);
            }
            else if (operator.textContent == '=') {
                let answer = 0;
                firstNum = parseInt(firstNum, 10);
                num = parseInt(num, 10);
                if(chosenOperation == 'add'){
                    answer = operate('add', firstNum, num);
                }
                else if(chosenOperation == 'subtract'){
                    answer = operate('subtract', firstNum, num);
                }
                else if(chosenOperation == 'multiply'){
                    answer = operate('multiply', firstNum, num);
                }
                else if(chosenOperation == 'divide'){
                    answer = operate('divide', firstNum, num);
                }

                display.textContent = answer;
            }
        });
    });

    backspace.addEventListener('click', () => {
        if(num.toString().includes('.')) {
            num = ((num * 10) - ((num * 10) % 10)) / 10;
            display.textContent = `${num}.`;
        }
        //When number diplayed is followed by dot, remove the dot in the display
        else if(display.textContent.charAt(display.textContent.length-1) == ".") {
            display.textContent = display.textContent.substring(0, display.textContent.length-1);
        }
        else{
            num = (num - (num % 10)) / 10;
            display.textContent = num;
        }

        animateClick(backspace);
    });
});