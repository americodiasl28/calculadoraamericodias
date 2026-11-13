const display = document.querySelector('#display');
const botoesNumero = document.querySelectorAll('.numero');
const botoesOperador = document.querySelectorAll('.operador');
const botaoPercentagem= document.querySelector(".percent");
const botaoDecimal = document.querySelector('#Decimal');
const botaoIgual = document.querySelector('#igual');
const botaoLimparTudo = document.querySelector('#ac');
const botaoApagarUm = document.querySelector('#limpar');

let resultadoMostrado = false;
let valorAtual = '';
let valorAnterior = '';
let operador = null;

// Chamando Números

botoesNumero.forEach(botao => {
  botao.addEventListener('click', () => {
    if (resultadoMostrado) {
      valorAtual = ''; 
      resultadoMostrado = false;  
    }
    valorAtual += botao.textContent.trim();
    display.value = valorAtual;
  });
});
// Decimal
botaoDecimal.addEventListener('click', () => {
  if (valorAtual.includes('.')) return;
  valorAtual += valorAtual === '' ? '0.' : '.';
  if (resultadoMostrado===true) {
    valorAtual = '0.';
    resultadoMostrado = false;
  }
  display.value = valorAtual;
});

// Operadores
botoesOperador.forEach(botao => {
  botao.addEventListener('click', () => {
    if (valorAtual === '') return;

    if (valorAnterior !== '') {
      calcular();
    }
    resultadoMostrado = false;  
    operador = botao.textContent.trim();
    valorAnterior = valorAtual;
    valorAtual = '';
    display.value=operador;
  });
});
// Percentagem
botaoPercentagem.addEventListener("click", () => {
    display.value=valorAtual+"%"  
  valorAtual= valorAtual*(valorAnterior/100);
  resultadoMostrado=false;

})

// Igual
function calcular() {
  const anterior = parseFloat(valorAnterior);
  const atual = parseFloat(valorAtual);

  if (isNaN(anterior) || isNaN(atual)) return;

  let resultado;

  switch (operador) {
    case '+':
      resultado = anterior + atual;
      break;
    case '-':
      resultado = anterior - atual;
      break;
    case 'x':
      resultado = anterior * atual;
      break;
    case '÷':
      resultado = anterior / atual;
      break;
    default:
      return;
  }

  valorAtual = resultado.toString();
  valorAnterior = '';
  operador = null;
  display.value = valorAtual;
  resultadoMostrado=false;
  
}

botaoIgual.addEventListener('click', () => {
  calcular();
  resultadoMostrado = true;
});

// Clean → apaga tudo
botaoLimparTudo.addEventListener('click', () => {
  valorAtual = '';
  valorAnterior = '';
  operador = null;
  display.value = '';
});

// Delete → apaga o último caractere
botaoApagarUm.addEventListener('click', () => {
  valorAtual = valorAtual.slice(0, -1);
  display.value = valorAtual;
});