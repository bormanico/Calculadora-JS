const output = document.getElementById('output');

const btnClear = document.querySelector('#r1-1');
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
const btnDecimal = document.querySelector('#r5-2');
const btnEquals = document.querySelector('#r5-3');

// mapeamento das teclas do teclado numérico para cliques nos botões da calculadora
document.addEventListener('keydown', function (event) {
  console.log(event.key);
  switch (event.key) {
    case '0':
      btn0.click();
      break;
    case '.':
      btnDecimal.click();
      break;
    case 'Enter':
      btnEquals.click();
      break;
    case '1':
      btn1.click();
      break;
    case '2':
      btn2.click();
      break;
    case '3':
      btn3.click();
      break;
    case '4':
      btn4.click();
      break;
    case '5':
      btn5.click();
      break;
    case '6':
      btn6.click();
      break;
    case '+':
      btnPlus.click();
      break;
    case '7':
      btn7.click();
      break;
    case '8':
      btn8.click();
      break;
    case '9':
      btn9.click();
      break;
    case '/':
      btnDivide.click();
      break;
    case '*':
      btnTimes.click();
      break;
    case '-':
      btnMinus.click();
      break;
  }
});

/**
 * Função que introduz valores no "visor".
 * Caso esteja no visor 0 ou NaN substitui pelo valor da tecla. Caso contrário acrescenta ao restante.
 */
function outputClick(value) {
  if (output.textContent === '0' || output.textContent === 'NaN') {
    output.textContent = value;
  } else {
    output.textContent += value;
  }
}

/**
 * Variável para controlar a introdução de separadores decimais.
 * Posta a 'true' com a introdução de vírgula e a 'false' com a introdução dos operadores (+, -, x e /), do 'igual' e do 'clear'
 */
let isDecimal = false;

// botão 'clear': põe o valor no visor a '0'
btnClear.addEventListener('click', function () {
  output.textContent = '0';
  isDecimal = false;
});

/**
 *
 * Função usada para a introdução de operadores (soma, multiplicação, etc.) e da vírgula.
 * Se o último caractere no visor for um operador substitui-o, se não acrescenta.
 * Se estiver 'NaN' no visor subsitui por '0'
 * @param {*} value
 */
function outputOperator(value) {
  if (output.textContent !== 'NaN') {
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
    }
  } else {
    output.textContent = '0';
  }
}

//Mapeamento das teclas da calculadora
btnDivide.addEventListener('click', function () {
  outputOperator('\u00f7');
  isDecimal = false;
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
  isDecimal = false;
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

/**
 * Introdução do operador '-'.
 * Caso esteja '0' no visor substitui o '0', caso contrário é feita a introdução como os restantes operadores
 */
btnMinus.addEventListener('click', function () {
  if (output.textContent === '0') {
    outputClick('\u2212');
  } else {
    outputOperator('\u2212');
    isDecimal = false;
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
  isDecimal = false;
});

btn0.addEventListener('click', function () {
  outputClick('0');
});

btnDecimal.addEventListener('click', function () {
  if (!isDecimal) {
    outputOperator('\u002c');
    isDecimal = true;
  }
});

/**
 * 'Unicode escape sequences' para os operadores matemáticos:
 * comma '\u002c'
 * plus '\u002b'
 * minus '\u2212'
 * times '\u00d7'
 * division '\u00f7'
 */

/**
 * Botão de igualdade. Usa a função eval() para avaliar a string no visor e retorna o valor para o visor.
 */
btnEquals.addEventListener('click', function () {
  isDecimal = false;

  let equation = output.textContent;

  // substituição dos símbolos unicode na string do visor por carateres reconhecidos pela função eval().
  equation = equation.replaceAll('\u002c', '.');
  equation = equation.replaceAll('\u002b', '+');
  equation = equation.replaceAll('\u2212', '-');
  equation = equation.replaceAll('\u00d7', '*');
  equation = equation.replaceAll('\u00f7', '/');

  let result = eval(equation);
  //console.log(equation, result);

  /**
   * corrige o erro de precisão dos 'floating point numbers' no resultado, até 7 casas decimais.
   * Number.EPSILON é o menor número de ponto flutuante positivo (~2,22E-16). É usado aqui para arrendondar corretamente, por exemplo, 1,5E-8 para 2E-8
   *
   */
  result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;

  // converte o resultado da divisão por zero da função eval() para 'NaN' conforme pedido no enunciado.
  if (result === Infinity) {
    output.textContent = 'NaN';
  } else {
    // altera o separador decimal de '.' para ',' e mostra o resultado no visor.
    result = result.toString();
    result = result.replace('.', '\u002c');
    console.log(result);
    output.textContent = result;
  }
});
