
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let gameBoard = Array(9).fill('');
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

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameBoard[cellIndex] !== '' || !gameActive) {
            return;
        }

        updateCell(clickedCell, cellIndex);
        checkResult();
    };

    const updateCell = (cell, index) => {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
    };

    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    };

    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        const roundDraw = !gameBoard.includes('');
        if (roundDraw) {
            statusText.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        changePlayer();
    };

    const restartGame = () => {
        currentPlayer = 'X';
        gameBoard = Array(9).fill('');
        gameActive = true;
        statusText.textContent = 'Play now';
        cells.forEach(cell => cell.textContent = '');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
