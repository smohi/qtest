
const gameButton = document.getElementById('game-button');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverText = document.getElementById('game-over');
const playerNameInput = document.getElementById('player-name');
const startButton = document.getElementById('start-btn');
const leaderboardList = document.getElementById('leaderboard-list');

let score = 0;
let timeLeft = 60;
let gameInterval;
let timerInterval;
let playerName = '';
let leaderboard = [];

// Function to start the game
function startGame() {
    playerName = playerNameInput.value;
    if (playerName === '') {
        alert('Please enter your name to start the game.');
        return;
    }

    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    gameOverText.style.display = 'none';
    gameArea.style.display = 'block';
    startButton.style.display = 'none';
    playerNameInput.disabled = true;

    moveButton();

    // Timer countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Allow clicking the button to gain points
    gameInterval = setInterval(moveButton, 1000);
}

// Function to move the button to a random position
function moveButton() {
    const x = Math.floor(Math.random() * (gameArea.clientWidth - gameButton.clientWidth));
    const y = Math.floor(Math.random() * (gameArea.clientHeight - gameButton.clientHeight));
    gameButton.style.left = `${x}px`;
    gameButton.style.top = `${y}px`;
}

// Function to end the game
function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    gameArea.style.display = 'none';
    gameOverText.textContent = `Game Over! ${playerName}, your final score is: ${score}`;
    gameOverText.style.display = 'block';
    startButton.style.display = 'block';
    playerNameInput.disabled = false;

    // Add score to leaderboard
    leaderboard.push({ name: playerName, score });
    updateLeaderboard();
}

// Function to update leaderboard
function updateLeaderboard() {
    leaderboardList.innerHTML = '';
    leaderboard.sort((a, b) => b.score - a.score); // Sort by score
    leaderboard.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name}: ${player.score}`;
        leaderboardList.appendChild(li);
    });
}

// Event listener for button click to increase score
gameButton.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    moveButton();
});

// Check if player clicked outside the button
function checkMissedClick(event) {
    if (event.target !== gameButton) {
        endGame();
    }
}

// Show the start button once a name is entered
playerNameInput.addEventListener('input', () => {
    startButton.style.display = playerNameInput.value ? 'block' : 'none';
});