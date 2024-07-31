const gameBoard = document.getElementById('Board');
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkForWin();
    checkForDraw();
    
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkForWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            statusMessage.textContent = `Player ${gameState[a]} has won!`;
            highlightWinningCells([a, b, c]);
            return;
        }
    }
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].style.backgroundColor = 'lightgreen';
    });
}

function checkForDraw() {
    if (!gameState.includes('') && gameActive) {
        gameActive = false;
        statusMessage.textContent = "It's a draw!";
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initialize the status message
statusMessage.textContent = `Player ${currentPlayer}'s turn`;
