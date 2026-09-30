const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameRunning = true;

let board = ["", "", "", "", "", "", "", "",""];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", function () {
        console.log("Clicked:", index);

        if (board[index] !== "" || !gameRunning) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();
    });
});

function checkWinner() {

    for (let pattern of winningPatterns) {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            statusText.textContent = "Player " + currentPlayer + " Wins!";
            gameRunning = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameRunning = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = "Player " + currentPlayer + "'s Turn";
}

restartButton.addEventListener("click", restartGame);

function restartGame() {

    board = ["", "", "", "", "", "", "", "",""];

    currentPlayer = "X";
    gameRunning = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}