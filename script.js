document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const reward = document.getElementById('reward');
    const gameText = document.getElementById('game-text'); // Seleccionar el título
    const gameSubtext = document.getElementById('game-subtext');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const cards = ['💅🏻', '🥪', '🍬', '👚', '💅🏻', '🥪', '🍬', '👚'];
    let shuffledCards = [];
    let flippedCards = [];
    let matchedPairs = 0;

    // Barajar las cartas
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Crear el tablero del juego
    function createBoard() {
        shuffledCards = shuffle(cards);
        shuffledCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = card;
            cardElement.dataset.index = index;
            cardElement.innerHTML = '?';
            cardElement.addEventListener('click', flipCard);
            board.appendChild(cardElement);
        });
    }

    // Girar la carta
    function flipCard() {
        const cardElement = this;

        if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
            cardElement.innerHTML = cardElement.dataset.value;
            cardElement.classList.add('flipped');
            flippedCards.push(cardElement);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    // Comprobar si hay pareja
    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            matchedPairs++;
            flippedCards = [];

            // Si todas las parejas están resueltas, mostrar el vale regalo
            if (matchedPairs === cards.length / 2) {
                setTimeout(showReward, 500);
            }
        } else {
            firstCard.innerHTML = '?';
            secondCard.innerHTML = '?';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }
    }

    // Mostrar el vale regalo y animación de confeti
    function showReward() {
        board.classList.add('hidden');
        reward.classList.remove('hidden');
        gameSubtext.classList.add('hidden'); // Oculta el texto del juego
        gameText.classList.add('hidden'); // Oculta el título del juego
        launchConfetti(); // Inicia la animación de confeti
    }

    // Animación de confeti
    function launchConfetti() {
        confetti({
            particleCount: 200,
            spread: 60,
            origin: { y: 0.6 },
            disableForReducedMotion: true
        });
    }

    // Inicializar el juego
    createBoard();
});
