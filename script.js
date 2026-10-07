const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartButton = document.getElementById("restart");

const humanModeButton = document.getElementById("humanMode");

const aiModeButton = document.getElementById("aiMode");

const modeText = document.getElementById("modeText");


let currentPlayer = "X";

let gameRunning = true;

let gameMode = "human";


const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


// ==========================
// PLAYER CLICK
// ==========================

cells.forEach(function(cell, index) {

    cell.addEventListener("click", function() {

        if (!gameRunning) {
            return;
        }

        // AI is X's opponent, so human plays X
        if (gameMode === "ai" && currentPlayer === "O") {
            return;
        }

        if (cell.textContent !== "") {
            return;
        }

        cell.textContent = currentPlayer;

        checkGame();

    });

});


// ==========================
// CHECK GAME
// ==========================

function checkGame() {

    if (checkWinner(currentPlayer)) {

        statusText.textContent =
            "🎉 Player " + currentPlayer + " wins!";

        gameRunning = false;

        return;
    }


    if (checkDraw()) {

        statusText.textContent =
            "🤝 It's a draw!";

        gameRunning = false;

        return;
    }


    // Change player

    if (currentPlayer === "X") {

        currentPlayer = "O";

    } else {

        currentPlayer = "X";

    }


    statusText.textContent =
        "Player " + currentPlayer + "'s turn";


    // AI's turn

    if (
        gameMode === "ai" &&
        currentPlayer === "O" &&
        gameRunning
    ) {

        setTimeout(aiMove, 500);

    }

}


// ==========================
// CHECK WINNER
// ==========================

function checkWinner(player) {

    for (let combination of winningCombinations) {

        const a = combination[0];

        const b = combination[1];

        const c = combination[2];


        if (
            cells[a].textContent === player &&
            cells[b].textContent === player &&
            cells[c].textContent === player
        ) {

            return true;

        }

    }

    return false;

}


// ==========================
// CHECK DRAW
// ==========================

function checkDraw() {

    for (let cell of cells) {

        if (cell.textContent === "") {

            return false;

        }

    }

    return true;

}


// ==========================
// AI MOVE
// ==========================

function aiMove() {

    if (!gameRunning) {
        return;
    }


    // Get empty squares

    let emptyCells = [];


    cells.forEach(function(cell, index) {

        if (cell.textContent === "") {

            emptyCells.push(index);

        }

    });


    if (emptyCells.length === 0) {
        return;
    }


    // Try to win

    let winningMove = findWinningMove("O");


    if (winningMove !== null) {

        cells[winningMove].textContent = "O";

    }

    else {

        // Block player

        let blockingMove = findWinningMove("X");


        if (blockingMove !== null) {

            cells[blockingMove].textContent = "O";

        }

        else {

            // Take center

            if (cells[4].textContent === "") {

                cells[4].textContent = "O";

            }

            else {

                // Random empty square

                let randomIndex =
                    Math.floor(Math.random() * emptyCells.length);

                let move =
                    emptyCells[randomIndex];

                cells[move].textContent = "O";

            }

        }

    }


    checkGame();

}


// ==========================
// FIND WINNING MOVE
// ==========================

function findWinningMove(player) {

    for (let combination of winningCombinations) {

        let values = combination.map(function(index) {

            return cells[index].textContent;

        });


        let playerCount =
            values.filter(function(value) {

                return value === player;

            }).length;


        let emptyCount =
            values.filter(function(value) {

                return value === "";

            }).length;


        if (playerCount === 2 && emptyCount === 1) {

            return combination.find(function(index) {

                return cells[index].textContent === "";

            });

        }

    }


    return null;

}


// ==========================
// HUMAN VS HUMAN
// ==========================

humanModeButton.addEventListener("click", function() {

    gameMode = "human";

    modeText.textContent =
        "Mode: Human vs Human";

    restartGame();

});


// ==========================
// HUMAN VS AI
// ==========================

aiModeButton.addEventListener("click", function() {

    gameMode = "ai";

    modeText.textContent =
        "Mode: Human vs AI";

    restartGame();

});


// ==========================
// RESTART
// ==========================

restartButton.addEventListener("click", function() {

    restartGame();

});


function restartGame() {

    currentPlayer = "X";

    gameRunning = true;

    statusText.textContent =
        "Player X's turn";


    cells.forEach(function(cell) {

        cell.textContent = "";

    });

}