document.addEventListener('DOMContentLoaded', () => {
    const imageUrls = [
        'images/img1.jpg',
        'images/img2.jpg',
        'images/img3.jpg',
        'images/img4.jpg',
        'images/img5.jpg',
        'images/img6.jpg',
        'images/img7.jpg',
        'images/img8.jpg'
    ];
    let cards = [...imageUrls, ...imageUrls];
    cards = shuffle(cards);

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    const gameBoard = document.getElementById('board');

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function createCardElement(imageUrl) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.image = imageUrl;

        const frontFace = document.createElement('img');
        frontFace.src = imageUrl;
        card.appendChild(frontFace);

        card.addEventListener('click', handleCardClick);
        return card;
    }

    function initializeGame() {
        gameBoard.innerHTML = '';
        cards.forEach(imageUrl => {
            gameBoard.appendChild(createCardElement(imageUrl));
        });
    }

    function handleCardClick(e) {
        const card = e.currentTarget;

        if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

        card.classList.add('flipped');

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (firstCard.dataset.image === secondCard.dataset.image) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            resetBoard();
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    const restartButton = document.getElementById('restart-btn');
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            cards = shuffle(cards);
            initializeGame();
        });
    } else {
        console.error('Restart button not found');
    }

    initializeGame();
});
