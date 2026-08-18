import conteudos from './dados.js';

const container = document.getElementById('conteudo-principal');
container.innerHTML = '';

let currentIndex = 0;
let isScrolling = false; 

// Cria a estrutura visual
const mainContainer = document.createElement('div');
mainContainer.classList.add('content-container');

// Cria a Imagem
const imagemFixa = document.createElement('img');
imagemFixa.id = 'imagem-dinamica';
imagemFixa.title = "Clique para ler mais";

// Cria o Texto (Escondido por padrão)
const textoDisplay = document.createElement('div');
textoDisplay.id = 'texto-display';
textoDisplay.classList.add('texto-display');
textoDisplay.style.display = 'none'; 

mainContainer.appendChild(imagemFixa);
mainContainer.appendChild(textoDisplay);
container.appendChild(mainContainer);

// Função que atualiza a foto e prepara o texto
function atualizarConteudo(index) {
    const item = conteudos[index];
    
    // Efeito de fade na imagem
    imagemFixa.style.opacity = 0;
    setTimeout(() => {
        imagemFixa.src = item.imagem;
        imagemFixa.alt = item.alt;
        imagemFixa.style.opacity = 1;
    }, 200);

    // Atualiza o texto (mas mantém escondido até o clique)
    textoDisplay.innerHTML = `
        <h2>${item.titulo}</h2>
        ${item.texto}
    `;
    textoDisplay.style.display = 'none'; 
    textoDisplay.classList.remove('fade-in');
}

// Inicia com a primeira imagem
atualizarConteudo(currentIndex);

// Lógica de Scroll (Rodinha do Mouse) - Carrossel Infinito
window.addEventListener('wheel', (e) => {
    // Trava a tela para não descer
    e.preventDefault();

    // Se estiver no tempo de espera da animação, não faz nada
    if (isScrolling) return;

    if (e.deltaY > 0) {
        // Rolou para BAIXO: vai para a próxima imagem (ou volta pro começo se for a última)
        currentIndex = (currentIndex + 1) % conteudos.length;
        atualizarConteudo(currentIndex);
        ativarTravaDeTempo();
    } else if (e.deltaY < 0) {
        // Rolou para CIMA: volta para a imagem anterior (ou vai para a última se for a primeira)
        currentIndex = (currentIndex - 1 + conteudos.length) % conteudos.length;
        atualizarConteudo(currentIndex);
        ativarTravaDeTempo();
    }
}, { passive: false });

function ativarTravaDeTempo() {
    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, 600); // 600ms de intervalo entre uma rolagem e outra
}

// Lógica do Clique para mostrar/esconder o texto
imagemFixa.addEventListener('click', () => {
    if (textoDisplay.style.display === 'none') {
        textoDisplay.style.display = 'block';
        textoDisplay.classList.add('fade-in');
    } else {
        textoDisplay.style.display = 'none';
        textoDisplay.classList.remove('fade-in');
    }
});