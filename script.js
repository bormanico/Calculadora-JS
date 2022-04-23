const output = document.getElementById('output');

const btnDivide = document.querySelector('#r1-4');
const btn7 = document.querySelector('#r2-1');
const btn8 = document.querySelector('#r2-2');
const btn9 = document.querySelector('#r2-3');
const btnTimes = document.querySelector('#r2-4');
const btn4 = document.querySelector('#r3-1');
const btn5 = document.querySelector('#r3-2');
const btn6 = document.querySelector('#r3-3');
const btnMinus = document.querySelector('#r3-4');
const btn1 = document.querySelector('#r4-1');
const btn2 = document.querySelector('#r4-2');
const btn3 = document.querySelector('#r4-3');
const btnPlus = document.querySelector('#r4-4');
const btn0 = document.querySelector('#r5-1');
const btnComma = document.querySelector('#r5-2');
const btnEquals = document.querySelector('#r5-3');

function outputClick(value) {
  if (output.textContent === '0') {
    output.textContent = value;
  } else {
    output.textContent += value;
  }
}

document.getElementById('r1-1').addEventListener('click', function () {
  output.textContent = '0';
});

function outputOperator(value) {
  let outputStr = output.textContent;
  let lastChar = outputStr.charAt(outputStr.length - 1);
  if (
    lastChar === '\u00f7' ||
    lastChar === '\u00d7' ||
    lastChar === '\u2212' ||
    lastChar === '\u002b' ||
    lastChar === '\u002c'
  ) {
    let newStr = outputStr.slice(0, -1);
    newStr += value;
    output.textContent = newStr;
  } else {
    output.textContent += value;

    //outputClick(value);
  }
}

btnDivide.addEventListener('click', function () {
  outputOperator('\u00f7');
});

btn7.addEventListener('click', function () {
  outputClick('7');
});

btn8.addEventListener('click', function () {
  outputClick('8');
});

btn9.addEventListener('click', function () {
  outputClick('9');
});

btnTimes.addEventListener('click', function () {
  outputOperator('\u00d7');
});

btn4.addEventListener('click', function () {
  outputClick('4');
});

btn5.addEventListener('click', function () {
  outputClick('5');
});

btn6.addEventListener('click', function () {
  outputClick('6');
});

btnMinus.addEventListener('click', function () {
  if (output.textContent === '0') {
    outputClick('\u2212');
  } else {
    outputOperator('\u2212');
  }
});

btn1.addEventListener('click', function () {
  outputClick('1');
});
btn2.addEventListener('click', function () {
  outputClick('2');
});
btn3.addEventListener('click', function () {
  outputClick('3');
});
btnPlus.addEventListener('click', function () {
  outputOperator('\u002b');
});

btn0.addEventListener('click', function () {
  outputClick('0');
});

btnComma.addEventListener('click', function () {
  outputOperator('\u002c');
});
btnEquals.addEventListener('click', function () {
  /**
   * comma '\u002c'
   * plus '\u002b'
   * minus '\u2212'
   * times '\u00d7'
   * divide '\u00f7'
   */

  let equation = output.textContent;

  equation = equation.replace('\u002c', '.');
  equation = equation.replace('\u002b', '+');
  equation = equation.replace('\u2212', '-');
  equation = equation.replace('\u00d7', '*');
  equation = equation.replace('\u00f7', '/');

  console.log(equation);

  let result = eval(equation);
  result = result.toString();
  result = result.replace('.', '\u002c');
  output.textContent = result;
});
