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
    if(y == 0){
        return "Syntax Error";
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
    element.classList.add('clicked')

    setTimeout(() => {
        element.classList.remove('clicked');
    },100);
}

window.addEventListener('load', () => {
    const numbers = document.querySelectorAll('.numbers');
    const display = document.querySelector('#display > p');
    const operators = document.querySelectorAll('.operators');
    const equals = document.getElementById('equals');
    const clear = document.getElementById('clear');
    const point = document.getElementById('point');
    const backspace = document.getElementById('backspace');
    let num = 0;
    let firstNum = 0;
    let answer = 0;
    let operation = "";

    numbers.forEach(number => {
        number.addEventListener('click', () => {
            let isFloatingPoint = false;
            let trailingZerosCount = 0;

            //check if operation has value and num is zero. If true, clear current display
            if(operation != '' && num == 0){
                display.textContent = '';
            }

            //max of 15 numbers only
            if(display.textContent.length == 15) {
                return;
            }

            //check if the current display has a dot
            if(display.textContent.includes('.')){
                isFloatingPoint = true;
                let lengthBeforeParse = 0;
                let lengthAfterParse = 0;

                num = display.textContent;
                num = num + number.textContent;
                lengthBeforeParse = num.length;
                num = parseFloat(num);
                lengthAfterParse = num.toString().length;

                /*If number turns to whole number after parse, add 1 to the difference of 
                  lengthBeforeParse and lengthAfterParse. Otherwise, get only the difference.*/
                if(num%1 == 0){
                    trailingZerosCount = lengthBeforeParse - (lengthAfterParse + 1);
                }
                else {
                    trailingZerosCount = lengthBeforeParse - lengthAfterParse;
                }
                
            }
            else{
                num = (num * 10) + parseInt(number.textContent, 10);
            }
            
            if(isFloatingPoint && num%1 == 0) {
                display.textContent = num + '.';
            }
            else{
                display.textContent = num;
            }

            while(trailingZerosCount > 0) {
                display.textContent += '0';
                trailingZerosCount--;
            }
            

            animateClick(number);
        });
    });

    operators.forEach(operator => {
        operator.addEventListener('click', () => {
            //evaluate when there's an operation already. Otherwise, put value of num to firstNum
            if(operation != '') {
                firstNum = operate(operation, firstNum, num);
                if(firstNum%1 != 0){ //if there's a remainder
                    firstNum = firstNum.toFixed(2);
                }
                display.textContent = firstNum;
                console.log(firstNum);
            }
            else{
                firstNum = num;
            }
            
            //reset num to zero
            num = 0;

            

            if(operator.textContent == '+') {
                operation = 'add';
            }
            else if(operator.textContent == '-') {
                operation = 'subtract';
            }
            else if(operator.textContent == 'x') {
                operation = 'multiply';
            }
            else if(operator.textContent == '/') {
                operation = 'divide';
            }
        });
    });

    equals.addEventListener('click', () => {
        if(operation == ''){  //if equals is clicked without operation selected
            return;
        }

        answer = operate(operation, firstNum, num);
        
        if(answer == "Syntax Error") {
            display.textContent = answer;

            operation = '';
            firstNum = 0;
            num = 0;
            return;
        }
        else if(answer.toString().length > 16){
            display.textContent = "Answer too long"

            operation = '';
            firstNum = 0;
            num = 0;
            return;
        }

        operation = '';
        firstNum = 0;
        num = answer; // answer after clicking equal can still be used

        //When there's a remainder, round to two decimal
        if(answer%1 != 0 && answer != "Syntax Error"){
            answer = answer.toFixed(2);
        }

        display.textContent = answer;
    });

    clear.addEventListener('click', () => {
        operation = '';
        firstNum = 0;
        num = 0;

        display.textContent = num;
    });

    point.addEventListener('click', () =>{
        if(display.textContent.includes('.')){
            return;
        }

        display.textContent = display.textContent + '.';
    });

    backspace.addEventListener('click', () =>{
        if(display.textContent.substr(-1) == '.'){
            display.textContent = num;
        }
        else if(display.textContent.includes('.')){
            let lengthAfterParse = 0;
            let lengthBeforeParse = 0;
            let trailingZerosCount = 0;
            num = display.textContent.substr(0, display.textContent.length-1);
            lengthBeforeParse = num.length;
            num = parseFloat(num);
            lengthAfterParse = num.toString().length;
            if(num%1 == 0){
                display.textContent = `${num}.`;
                trailingZerosCount = lengthBeforeParse - (lengthAfterParse + 1);
            }
            else{
                display.textContent = `${num}`;
                trailingZerosCount = lengthBeforeParse - lengthAfterParse;
            }

            while(trailingZerosCount > 0){
                display.textContent += '0';
                trailingZerosCount--;
            }
        }
        else {
            num = (num - num%10) / 10;
            display.textContent = num;
        }
    });
});