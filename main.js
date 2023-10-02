const focoBt = document.querySelector(".list-option-btn--foco");
const curtoBt = document.querySelector(".list-option-btn--descanso-curto");
const longoBt = document.querySelector(".list-option-btn--descanso-longo");
const musicaPlayPause = document.querySelector("#alternar-musica");
const body = document.querySelector(".body");
const image = document.querySelector('.banner__image')
const timeContainer = document.querySelector(".time__container");
const optionsButtons = document.querySelectorAll(".list-option-btn");
const switchButtonBg = document.querySelector(".toggle-switch");
const switchButton = document.querySelector(".toggle-switch-btn");
const checkBox = document.querySelector(".toggle-checkbox");
const buttonPlayPause = document.querySelector(".app__card-primary-button");
const title = document.querySelector(".banner__title");
const startPausedText = document.querySelector('.app__card-primary-button span');
const startPausedImg = document.querySelector('.app__card-primary-button img');


//Audios
const playSong = new Audio('/sons/play.wav');
const pauseSong = new Audio('/sons/pause.mp3');
const endSong = new Audio("/sons/beep.mp3");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;

let temporizador = 1500;
let interval = null;

focoBt.addEventListener('click', () => {

    temporizador = 1500;

    alterarContexto(timeContainer, 'foco');
    alterarContexto(switchButtonBg, 'foco');
    alterarContexto(switchButton, 'foco');
    alterarContexto(checkBox, 'foco');
    alterarContexto(buttonPlayPause, 'foco');
    focoBt.classList.add('active')
})


curtoBt.addEventListener('click', () => {

    temporizador = 300

    alterarContexto(timeContainer, 'descanso-curto');
    alterarContexto(switchButtonBg, 'descanso-curto');
    alterarContexto(switchButton, 'descanso-curto');
    alterarContexto(checkBox, 'descanso-curto');
    alterarContexto(buttonPlayPause, 'descanso-curto');
    curtoBt.classList.add('active')

})

longoBt.addEventListener('click', () => {

    temporizador = 900

    alterarContexto(timeContainer, 'descanso-longo');
    alterarContexto(switchButtonBg, 'descanso-longo');
    alterarContexto(switchButton, 'descanso-longo');
    alterarContexto(checkBox, 'descanso-longo');
    alterarContexto(buttonPlayPause, 'descanso-longo');
    longoBt.classList.add('active')
})


function alterarContexto(componente, contexto) {
    mostrarTempo()

    optionsButtons.forEach(botao => {
        botao.classList.remove('active')
    })

    body.setAttribute('data-contexto', contexto)
    image.setAttribute('src', `/image/${contexto}.png`)

    componente.classList.remove("foco");
    componente.classList.remove("descanso-curto");
    componente.classList.remove("descanso-longo");

    componente.classList.add(contexto)


    switch (contexto) {
        case 'foco':
            title.innerHTML = ` <h1 class="banner__title">
            Otimize sua produtividade,<br>
            <strong class="banner__title-strong">mergulhe no que importa.</strong>
        </h1>`

            break;

        case 'descanso-curto':
            title.innerHTML = ` <h1 class="banner__title">
            Que tal dar uma respirada? <br>
            <strong class="banner__title-strong">Faça uma pausa curta!</strong>
        </h1>`
            break;

        case 'descanso-longo':
            title.innerHTML = ` <h1 class="banner__title">
            Hora de voltar à superfície.<br>
            <strong class="banner__title-strong">Faça uma pausa longa.</strong>
        </h1>`
            break;
        default:
            break;
    }
}



buttonPlayPause.addEventListener('click', inciarOuPausar)


function contagemRegressiva() {
    if (temporizador <= 0) {
        endSong.play();
        alert('tempo finalizado')
        zerarTime()
        return
    }
    temporizador -= 1
    mostrarTempo()
}

function inciarOuPausar() {
    if (interval) {
        pauseSong.play();
        zerarTime()
        return
    } else {
        playSong.play();
        interval = setInterval(contagemRegressiva, 1000)
        startPausedText.textContent = "Pausar";
        startPausedImg.setAttribute('src', "/image/pause.png");
    }
}

function zerarTime() {
    clearInterval(interval);
    interval = null;
    startPausedText.textContent = "Começar";
    startPausedImg.setAttribute('src', "/image/play_arrow.png");
}


function mostrarTempo() {
    const tempo = new Date(temporizador * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute:'2-digit', second: '2-digit'});

    document.getElementById("timer").innerHTML = `${tempoFormatado}`
    
}


musicaPlayPause.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})



mostrarTempo()