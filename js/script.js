let ponto_a = document.getElementById('ponto-a');
let ponto_b = document.getElementById('ponto-b');
let equacao_reta = document.getElementById('equacao-reta');
let equacao_circunferencia = document.getElementById('equacao-circunferencia');

let escolha = document.getElementById('escolha');
let choice = '1';
let resultado = document.getElementById('resultado');

const xa = Number(document.getElementById('xa').value);
const ya = Number(document.getElementById('ya').value);

function getEscolha() {
    choice = escolha.value;
    switch (choice) {
        case '1':
            equacao_circunferencia.style.display = 'none';
            ponto_b.style.display = 'none';
            equacao_reta.display = 'block';
            break;
        case '2':
            equacao_circunferencia.style.display = 'block';
            ponto_b.style.display = 'block';
            equacao_reta.display = 'none';
            break;
        default:
            equacao_circunferencia.style.display = 'none';
            ponto_b.style.display = 'none';
            equacao_reta.display = 'block';
    }
    console.log(`Foi escolhido a opção ${choice}`);
}

escolha.addEventListener('change', getEscolha);

let botao = document.getElementById('botao');

function distanciaPontoReta(x, y) {
    const a = Number(document.getElementById('valor-a').value);
    const b = Number(document.getElementById('valor-b').value);
    const c = Number(document.getElementById('valor-c').value);
    const d = Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);

    resultado.innerHTML += (d > 0) ? 'O ponto não pertence a reta' : 'O ponto pertence a reta';
}

function calcularValores() {
    resultado.innerHTML = '';

    switch (choice) {
        case '1':
            resultado.innerHTML += '<h2>Distância de ponto a reta</h2><br>';
            distanciaPontoReta(xa, ya);
            break;
        default:
            resultado.innerHTML += 'Não implementado ainda';
    }
}

botao.addEventListener('click', calcularValores);
