const magoVermelho = document.getElementById('p1');
const magoAzul = document.getElementById('p2');

let posX = 100; // MAGO VERMELHO    
let posY = 100; // Altura do chão (0 = no chão)
let velocidade = 4;
let velocidadeY = 0; // Velocidade vertical
let pulando = false;

let posX2 = 300; // MAGO AZUL
let posY2 = 100; 
let velocidade2 = 4;
let velocidadeY2 = 0; 
let pulando2 = false;

const gravidade = 0.3;
const forcaDoPulo = 10;
const chao = 100;

if (posY <= chao){
    posY = chao;
    velocidadeY = 0;
    pulando = false;
}

const teclas = {
    KeyW: false,
    KeyA: false,
    KeyD: false,

    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
};

document.addEventListener('keydown', (event) => {
    if (teclas.hasOwnProperty(event.code)) {
        teclas[event.code] = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (teclas.hasOwnProperty(event.code)) {
        teclas[event.code] = false;
    }
});

let ultimoTempo = 0;
function andar(tempoAtual = 0) {
    const deltaTime = (tempoAtual - ultimoTempo) / 16; // 16 ms = 60fps
    ultimoTempo = tempoAtual;
    //CONTROLES MAGO VERMELHO
    // Andar para os lados
    if (teclas.KeyD) {
        posX += velocidade;
    }
    if (teclas.KeyA) {
        posX -= velocidade;
    }
    // Pular
    if (teclas.KeyW && !pulando) {
        velocidadeY = forcaDoPulo;
        pulando = true;
    }

    //CONTROLES MAGO AZUL
    if (teclas.ArrowRight){
        posX2 += velocidade2;
    }
    if (teclas.ArrowLeft){
        posX2 -= velocidade2;
    }
    if (teclas.ArrowUp && !pulando2){
        velocidadeY2 = forcaDoPulo;
        pulando2 = true;
    }

    // Aplicar gravidade no VERMELHO
    velocidadeY -= gravidade;
    posY += velocidadeY;
    // Impedir de cair abaixo do chão
    if (posY <= chao) {
        posY = chao;
        velocidadeY = 0;
        pulando = false;
    }

    // Aplicar gravidade no AZUL
    velocidadeY2 -= gravidade;
    posY2 += velocidadeY2;
    // Impedir de cair abaixo do chão
    if (posY2 <= chao) {
        posY2 = chao;
        velocidadeY2 = 0;
        pulando2 = false;
    }

    magoVermelho.style.left = posX + 'px';
    magoVermelho.style.bottom = posY + 'px';

    magoAzul.style.left = posX2 + 'px';
    magoAzul.style.bottom = posY2 + 'px';

    requestAnimationFrame(andar);
}
andar();