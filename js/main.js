import conteudos from './dados.js';

const container = document.getElementById('conteudo-principal');
container.innerHTML = '';

let currentIndex = 0;
let isScrolling = false; 

const mainContainer = document.createElement('div');
mainContainer.classList.add('content-container');

const imagemFixa = document.createElement('img');
imagemFixa.id = 'imagem-dinamica';
imagemFixa.title = "Clique para ler mais";

const textoDisplay = document.createElement('div');
textoDisplay.id = 'texto-display';
textoDisplay.classList.add('texto-display');
textoDisplay.style.display = 'none'; 

mainContainer.appendChild(imagemFixa);
mainContainer.appendChild(textoDisplay);
container.appendChild(mainContainer);

function atualizarConteudo(index) {
    const item = conteudos[index];
    
    imagemFixa.style.opacity = 0;
    setTimeout(() => {
        imagemFixa.src = item.imagem;
        imagemFixa.alt = item.alt;
        imagemFixa.style.opacity = 1;
    }, 200);

    textoDisplay.innerHTML = `
        <h2>${item.titulo}</h2>
        ${item.texto}
    `;
    textoDisplay.style.display = 'none'; 
    textoDisplay.classList.remove('fade-in');
}

atualizarConteudo(currentIndex);

window.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (isScrolling) return;

    if (e.deltaY > 0) {
        currentIndex = (currentIndex + 1) % conteudos.length;
        atualizarConteudo(currentIndex);
        ativarTravaDeTempo();
    } else if (e.deltaY < 0) {

        currentIndex = (currentIndex - 1 + conteudos.length) % conteudos.length;
        atualizarConteudo(currentIndex);
        ativarTravaDeTempo();
    }
}, { passive: false });

function ativarTravaDeTempo() {
    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, 600); 
}

imagemFixa.addEventListener('click', () => {
    if (textoDisplay.style.display === 'none') {
        textoDisplay.style.display = 'block';
        textoDisplay.classList.add('fade-in');
    } else {
        textoDisplay.style.display = 'none';
        textoDisplay.classList.remove('fade-in');
    }
});