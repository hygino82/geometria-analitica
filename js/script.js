const distanciaPontos = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

let ponto_a = document.getElementById('ponto-a');
let ponto_b = document.getElementById('ponto-b');
let equacao_reta = document.getElementById('equacao-reta');
let equacao_circunferencia = document.getElementById('equacao-circunferencia');
let raio1 = document.getElementById('raio-1');
let circunferencias = document.getElementById('circunferencias');

let escolha = document.getElementById('escolha');
let choice = '1';
let resultado = document.getElementById('resultado');

const xa = Number(document.getElementById('xa').value);
const ya = Number(document.getElementById('ya').value);
const xb = Number(document.getElementById('xb').value);
const yb = Number(document.getElementById('yb').value);

function getEscolha() {
    choice = escolha.value;
    switch (choice) {
        case '1':
            equacao_circunferencia.style.display = 'none';
            ponto_a.style.display = 'block';
            ponto_b.style.display = 'none';
            equacao_reta.display = 'block';
            circunferencias.style.display = 'none';
            break;
        case '2':
            ponto_a.style.display = 'block';
            equacao_circunferencia.style.display = 'block';
            ponto_b.style.display = 'block';
            equacao_reta.style.display = 'none';
            circunferencias.style.display = 'none';
            break;
        case '3':
            equacao_circunferencia.style.display = 'none';
            ponto_b.style.display = 'none';
            equacao_reta.style.display = 'none';
            circunferencias.style.display = 'block';
            ponto_a.style.display = 'none';
            break;
        default:
            equacao_circunferencia.style.display = 'none';
            ponto_b.style.display = 'none';
            equacao_reta.display = 'block';
    }
    //console.log(`Foi escolhido a opção ${choice}`);
}

escolha.addEventListener('change', getEscolha);

let botao = document.getElementById('botao');

function distanciaPontoReta(x, y) {
    const a = Number(document.getElementById('valor-a').value);
    const b = Number(document.getElementById('valor-b').value);
    const c = Number(document.getElementById('valor-c').value);
    const d = Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);

    resultado.innerHTML += `<h4>d = ${d}</h4><br>`;
    resultado.innerHTML += (d > 0) ? '<p>O ponto não pertence a reta</p>' : '<p>O ponto pertence a reta</p>';
}

function distanciaPontoCircunferencia() {

    const r1 = Number(document.getElementById('raio-1').value);
    const xa = Number(document.getElementById('xa').value);
    const ya = Number(document.getElementById('ya').value);
    const xb = Number(document.getElementById('xb').value);
    const yb = Number(document.getElementById('yb').value);


    const A = {
        x: xa,
        y: ya
    }

    const B = {
        x: xb,
        y: yb
    }
    const d = distanciaPontos(A, B);
    resultado.innerHTML += `<h4>d = ${d}</h4><br>`;
    if (d > r1) {
        resultado.innerHTML += `<p>O ponto é exteno a circunferência</p>`;
    }
    else if (d < r1) {
        resultado.innerHTML += `<p>O ponto é interno a circunferência</p>`;
    }
    else {
        resultado.innerHTML += `<p>O ponto pertence circunferência</p>`;
    }
}

function posicaoCircunferencias() {
    const r1 = Number(document.getElementById('raio-c1').value);
    const r2 = Number(document.getElementById('raio-c2').value);
    const somaRaios = r1 + r2;
    const diferencaRaios = Math.abs(r1 - r2);

    const A = {
        x: Number(document.getElementById('cxa').value),
        y: Number(document.getElementById('cya').value)
    };

    const B = {
        x: Number(document.getElementById('cxb').value),
        y: Number(document.getElementById('cyb').value)
    };

    if (A == B) {
        resultado.innerHTML += 'C1 e C2 são concentricas';
    }
    else {
        const distancia = distanciaPontos(A, B);
        resultado.innerHTML += `<h4>d = ${distancia}</h4><br>`;

        if (distancia > somaRaios) {
            resultado.innerHTML += 'As circunferências não possuem ponto em comum externo';
        }
        else if (distancia == somaRaios) {
            resultado.innerHTML += 'As circunferências possuem um ponto em comum externo (são tangentes externamentes)';
        }
        else if ((distancia < somaRaios) && (distancia > diferencaRaios)) {
            resultado.innerHTML += 'As circunferências apresentam dois pontos em comum (são secantes)';
        }
        else if (distancia == diferencaRaios) {
            resultado.innerHTML += 'As circunferências possuem um ponto em comum interno (são tangentes internas)';
        }
        else {
            resultado.innerHTML += 'As circunferências não possuem ponto em comum interno';
        }
    }


}

function calcularValores() {
    resultado.style.display = 'block';
    resultado.innerHTML = '<h2>Resultado</h2><br>';

    switch (choice) {
        case '1':
            resultado.innerHTML += '<h2>Distância de ponto a reta</h2><br>';
            distanciaPontoReta(xa, ya);
            break;
        case '2':
            distanciaPontoCircunferencia();
            break;
        case '3':
            posicaoCircunferencias();
            break;
        default:
            resultado.innerHTML += 'Não implementado ainda';
    }
}

botao.addEventListener('click', calcularValores);
