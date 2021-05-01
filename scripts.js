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

window.addEventListener('load', function() {
    const numbers = document.querySelectorAll('.numbers');
    const display = document.querySelector('#display > p');
    const clear = document.getElementById('clear');
    const backspace = document.getElementById('backspace');
    const point = document.getElementById('point');
    let num = 0;
        
    
    numbers.forEach(number => {
        number.addEventListener('click', () => {
            //max display length of 15
            if(num.toString().length  == 15) { 
                return;
            }//1.0 yung num
            if(num != 0 && !display.textContent.includes('.')) {
                num = num * 10 + parseInt(number.textContent,10);
            }
            else if(display.textContent.includes('.')) {
                if(num.toString().includes('.')){
                    return;
                }
                num = ((num * 10) + parseInt(number.textContent,10)) / 10;
            }
            else {
                num = parseInt(number.textContent, 10);
            }
            display.textContent = num.toString();
        });
    });

    clear.addEventListener('click', () => {
        num = 0;
        display.textContent = 0;
    });

    backspace.addEventListener('click', () => {
        if(num.toString().includes('.')) {
            num = ((num * 10) - ((num * 10) % 10)) / 10;
            display.textContent = `${num}.`;
        }
        else{
            num = (num - (num % 10)) / 10;
            display.textContent = num;
        }

        
    });

    point.addEventListener('click', () => {
        if(display.textContent.toString().includes('.')) {
            return;
        }

        display.textContent += '.';
    })
});