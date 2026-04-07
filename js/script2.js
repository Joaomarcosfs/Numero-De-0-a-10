// script.js

let numeroSecreto = Math.floor(Math.random() * 11);
let tentativasRestantes = 2;

const inputPalpite = document.getElementById('palpite');
const btnAdivinhar = document.getElementById('btnAdivinhar');
const btnReiniciar = document.getElementById('btnReiniciar');
const mensagem = document.getElementById('mensagem');
const spanTentativas = document.getElementById('tentativas');

function atualizarTentativas() {
    spanTentativas.textContent = tentativasRestantes;
}

function mostrarMensagem(texto, cor) {
    mensagem.textContent = texto;
    mensagem.style.color = cor;
}

function desabilitarInput() {
    inputPalpite.disabled = true;
    btnAdivinhar.disabled = true;
    btnReiniciar.classList.remove('d-none');
}

// Função principal de adivinhação
function adivinhar() {
    const palpite = parseInt(inputPalpite.value);

    // Validação
    if (isNaN(palpite) || palpite < 0 || palpite > 10) {
        mostrarMensagem('❌ Digite um número entre 0 e 10!', '#dc3545');
        return;
    }

    tentativasRestantes--;
    atualizarTentativas();

    if (palpite === numeroSecreto) {
        mostrarMensagem(`🎉 Parabéns! Você acertou! O número era ${numeroSecreto}`, '#28a745');
        desabilitarInput();
    }
    else if (tentativasRestantes === 0) {
        mostrarMensagem(`😢 Fim de jogo! O número era ${numeroSecreto}`, '#dc3545');
        desabilitarInput();
    }
    else {
        const dica = palpite < numeroSecreto ? 'maior' : 'menor';
        mostrarMensagem(`❌ Errado! Tente um número ${dica}.`, '#ffc107');
        inputPalpite.value = '';
        inputPalpite.focus();
    }
}

// Evento do botão Adivinhar
btnAdivinhar.addEventListener('click', adivinhar);

// Permitir pressionar Enter no input
inputPalpite.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        adivinhar();
    }
});

// Reiniciar o jogo
btnReiniciar.addEventListener('click', () => {
    numeroSecreto = Math.floor(Math.random() * 11);
    tentativasRestantes = 2;
    atualizarTentativas();

    inputPalpite.value = '';
    inputPalpite.disabled = false;
    btnAdivinhar.disabled = false;
    mensagem.textContent = '';
    btnReiniciar.classList.add('d-none');
    inputPalpite.focus();
});

// Inicializa as tentativas na tela
atualizarTentativas();