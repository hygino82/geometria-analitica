const distanciaPontoReta = (a, b, c, p) => Math.abs(a * p.x + b * p.y + c) / Math.sqrt(a * a + b * b);
const distanciaPontos = (p, q) => Math.sqrt(Math.pow(q.x - p.x, 2) + Math.pow(q.y - p.y, 2));

let equacaoReta = document.getElementById('equacao-reta');
let ponto_a = document.getElementById('ponto-a');
let circunferencia_1 = document.getElementById('circunferencia-1');
let circunferencia_2 = document.getElementById('circunferencia-2');
let btnExecuta = document.getElementById('btn-executa');
let escolha = document.getElementById('escolha');
let resultado = document.getElementById('resultado');

function menuEscolha() {
    const opcao = escolha.value;

    switch (opcao) {
        case '1':
            equacaoReta.style.display = 'block';
            ponto_a.style.display = 'block';
            circunferencia_1.style.display = 'none';
            circunferencia_2.style.display = 'none';
            break;
        case '2':
            equacaoReta.style.display = 'none';
            ponto_a.style.display = 'block';
            circunferencia_1.style.display = 'block';
            circunferencia_2.style.display = 'none';
            break;
        case '3':
            equacaoReta.style.display = 'none';
            ponto_a.style.display = 'none';
            circunferencia_1.style.display = 'block';
            circunferencia_2.style.display = 'block';
            break;
        case '4':
            equacaoReta.style.display = 'block';
            ponto_a.style.display = 'none';
            circunferencia_1.style.display = 'block';
            circunferencia_2.style.display = 'none';
            break;
        default:
            equacaoReta.style.display = 'none';
            ponto_a.style.display = 'none';
            circunferencia_1.style.display = 'none';
            circunferencia_2.style.display = 'none';
    }
}

escolha.addEventListener('click', menuEscolha);

function calcularValores() {
    const opcao = escolha.value;
    resultado.style.display = 'block';
    resultado.innerHTML = '';

    switch (opcao) {
        case '1':
            posicaoPontoReta();
            break;
        case '2':
            posicaoPontoCircunferencia();
            break;
        case '3':
            posicaoCircunferencias();
            break;
        case '4':
            posicaoRetaCirfunferencia();
            break;
        default: resultado.innerHTML += '<h3>Não implementado ainda</h3>';
    }
}

btnExecuta.addEventListener('click', calcularValores);


function posicaoPontoReta() {

    const P = {
        x: Number(document.getElementById('xa').value),
        y: Number(document.getElementById('ya').value)
    };

    const a = Number(document.getElementById('valor-a').value);
    const b = Number(document.getElementById('valor-b').value);
    const c = Number(document.getElementById('valor-c').value);

    const distancia = distanciaPontoReta(a, b, c, P);
    resultado.innerHTML += `<h3>d = ${distancia}</h3><br>`;

    if (distancia > 0) {
        resultado.innerHTML += '<h4>O Ponto não pertence a reta</h4>';
    }
    else {
        resultado.innerHTML += '<h4>O Ponto pertence a reta</h4>';
    }
}

function posicaoPontoCircunferencia() {

    const P1 = {
        x: Number(document.getElementById('xa').value),
        y: Number(document.getElementById('ya').value)
    };

    const raio = Math.abs(Number(document.getElementById('raio-c1').value));

    const P2 = {
        x: Number(document.getElementById('cxa').value),
        y: Number(document.getElementById('cya').value)
    };

    const distancia = distanciaPontos(P1, P2);
    resultado.innerHTML += `<h3>d = ${distancia}</h3><br>`;

    if (distancia > raio) {
        resultado.innerHTML += '<h4>O Ponto está fora da circunferência</h4>';
    }
    else if (distancia == raio) {
        '<h4>O Ponto é tangente a circunferência</h4>';
    }
    else {
        '<h4>O Ponto está dentro da circunferência/h4>';
    }
}

function posicaoRetaCirfunferencia() {

    const a = Number(document.getElementById('valor-a').value);
    const b = Number(document.getElementById('valor-b').value);
    const c = Number(document.getElementById('valor-c').value);

    const P = {
        x: Number(document.getElementById('cxa').value),
        y: Number(document.getElementById('cya').value)
    };

    const raio = Math.abs(Number(document.getElementById('raio-c1').value));

    const distancia = distanciaPontoReta(a, b, c, P);
    resultado.innerHTML += `<h3>d = ${distancia}</h3><br>`;

    if (distancia > raio) {
        resultado.innerHTML += '<h4>A reta é externa a circunferência</h4>';
    }
    else if (distancia == raio) {
        resultado.innerHTML += '<h4>A reta é tangente a circunferência</h4>';
    }
    else {
        resultado.innerHTML += '<h4>A reta é secante a circunferência</h4>';
    }

    const m = -a / b;
    const n = -c / b;
    const quad = 1 + Math.pow(m, 2.0);
    const meio = -2 * (P.x + P.y * m)
    const ind = Math.pow(P.x, 2.0) + Math.pow(P.y, 2.0) - 2 * P.y * n - Math.pow(raio, 2.0);

    const delta = meio * meio - 4 * quad * ind;

    /* resultado.innerHTML += `<h3>m = ${m.toFixed(4)}</h3>`;
     resultado.innerHTML += `<h3>n = ${n.toFixed(4)}</h3>`;
     resultado.innerHTML += `<h3>a = ${quad.toFixed(4)}</h3>`;
     resultado.innerHTML += `<h3>b = ${meio.toFixed(4)}</h3>`;
     resultado.innerHTML += `<h3>c = ${ind.toFixed(4)}</h3>`;
     resultado.innerHTML += `<h2 style="color:red;">delta = ${delta.toFixed(4)}</h2>`;*/

    if (delta < 0) {
        resultado.innerHTML += '<h3>Não existe pontos da reta que pertençam a circunferencia</h3>';
    }
    else if (delta == 0) {
        const x = -meio / (2 * quad);
        const y = m * x + n;
        resultado.innerHTML += `O ponto (${x.toFixed(4)}, ${y.toFixed(4)}) pertence a reta e a circunferência`;
    }
    else {
        const x1 = (-meio + Math.sqrt(delta)) / (2 * quad);
        const x2 = (-meio - Math.sqrt(delta)) / (2 * quad);
        const y1 = m * x1 + n;
        const y2 = m * x2 + n;
        resultado.innerHTML += '<h3>A reta e a circunferência tem dois pontos em comum</h3>'
        resultado.innerHTML += `<h3>(${x1.toFixed(4)}, ${y1.toFixed(4)})<br>  (${x2.toFixed(4)}, ${y2.toFixed(4)})</h3>`;
    }
}

function posicaoCircunferencias() {
    const r1 = Math.abs(Number(document.getElementById('raio-c1').value));
    const r2 = Math.abs(Number(document.getElementById('raio-c2').value));
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

    if ((A.x == B.x) && (A.y == B.y)) {
        resultado.innerHTML += 'C1 e C2 são concentricas';
    }
    else {
        const distancia = distanciaPontos(A, B);
        resultado.innerHTML += 'Posição entre circunferências';
        resultado.innerHTML += `<h3>R1 + R2 = ${somaRaios}<br>`;
        resultado.innerHTML += `<h3>R1 - R2 = ${diferencaRaios}<br>`;
        resultado.innerHTML += `<h3>d = ${distancia}</h3><br>`;

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