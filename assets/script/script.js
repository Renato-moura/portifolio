const dynamicText = document.getElementById("dynamic-text");
const words = ["Front-End", "Back-End", "Full Stack"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Configurações de tempo
const typingSpeed = 150; // Velocidade de digitação (ms)
const pauseBetweenWords = 2000; // Pausa entre as palavras (ms)

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Apagar caracteres
        dynamicText.textContent = currentWord.substring(0, charIndex--);
    } else {
        // Adicionar caracteres
        dynamicText.textContent = currentWord.substring(0, charIndex++);
    }

    // Controle da lógica de escrita e reescrita
    if (!isDeleting && charIndex === currentWord.length) {
        // Palavra completa, iniciar exclusão após pausa
        isDeleting = true;
        setTimeout(typeEffect, pauseBetweenWords);
    } else if (isDeleting && charIndex === 0) {
        // Palavra apagada, avançar para a próxima
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, typingSpeed);
    } else {
        // Continuar escrevendo ou apagando
        setTimeout(typeEffect, typingSpeed);
    }
}

// Iniciar o efeito
typeEffect();



let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showNextItem() {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % totalItems;
    items[currentIndex].classList.add('active');
}

setInterval(showNextItem, 3000); // Troca de item a cada 3 segundos
