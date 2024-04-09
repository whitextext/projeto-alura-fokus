const html = document.querySelector('html');
const focobt = document.querySelector(".app__card-button--foco");
const curtobt = document.querySelector(".app__card-button--curto");
const longobt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const botaomusica = document.querySelector("#alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
musica.loop = true;
let tempoDecorrido = 1500;
const startPauseBt = document.querySelector("#start-pause");
const play = new Audio("./sons/play.wav");
const pause = new Audio("./sons/pause.mp3");
const tempoAcabou = new Audio("./sons/beep.mp3");
let intervaloId = null;
const iniciaPauseBt = document.querySelector("#start-pause span");
const simboloStartPause = document.querySelector(".app__card-primary-butto-icon");
const tempoTela = document.querySelector("#timer");



botaomusica.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    }else {
        musica.pause();
    }
});

focobt.addEventListener("click", () =>{
    tempoDecorrido = 1500;
    alterarContexto("foco");
    focobt.classList.add("active");
})

curtobt.addEventListener("click", () =>{
    tempoDecorrido = 300;
    alterarContexto("descanso-curto");
    curtobt.classList.add("active");
})

longobt.addEventListener("click", () =>{
    tempoDecorrido = 900;
    alterarContexto("descanso-longo");
    longobt.classList.add("active");
})

function alterarContexto(contexto){
    mostraTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0){
        tempoAcabou.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorrido -= 1;
    console.log('Temporizador: ' + tempoDecorrido);
    mostraTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        pause.play();
        zerar();
        return;
    }
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciaPauseBt.textContent = "pausar";
    simboloStartPause.setAttribute("src" , "./imagens/pause.png");
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    iniciaPauseBt.textContent = "começar";
    simboloStartPause.setAttribute("src", "./imagens/play_arrow.png");
}

function mostraTempo() {
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"});
    tempoTela.innerHTML = `${tempoFormatado}`;
}

mostraTempo();


