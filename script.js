// Gameboard object
const Gameboard = (function() {
    let board = ['','','','','','','','',''];

    function setField(index, sign) {
        board[index] = sign;
    }

    function getBoard() {
        return board;
    }

    function getField(index) {
        return board[index];
    }

    function resetBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return {
        setField,
        resetBoard,
        getBoard,
        getField
    }
})();


// Player Object
function Player(name, sign, score) {
    const playerName = name;
    const playerSign = sign;
    let playerScore = score;

    const getName = () => playerName;
    const getSign = () => playerSign;
    const getScore = () => playerScore;
    const updateScore = () => playerScore++;

    return {
        getName,
        getSign,
        getScore,
        updateScore
    }

}

// Controls the flow of the game
const GameControl = (function() {
    const startGame = document.querySelector('#startButton');
    const signs = document.querySelectorAll('.signBtn');
    const gameBoardFields = document.querySelectorAll('.gameBoardField')
    const player1Name = document.querySelector('#player1Name');
    const player2Name = document.querySelector('#player2Name');
    let player1Sign;
    let player2Sign;
    let player1;
    let player2;    
    let currentPlayer;
    let draw = 0;
    let round = 0;
    let winnerFound = false;

    signs.forEach(sign => {
        sign.addEventListener('click', toggleSelected)
    });

    startGame.addEventListener('click', initGame)

    function initGame() {
        round++;
        initPlayers();
        toggleGamePage();
        currentPlayer = player1;
        currentSign = player1.getSign();
        gameBoardFields.forEach((field) => field.addEventListener('click', markField))
        DisplayController.displayTurn(currentPlayer);
        DisplayController.displayScore(player1.getScore(), player2.getScore(), draw)
    }

    function markField() {
        const fieldID = this.getAttribute('data-field-id').split('-')[1];

        Gameboard.setField(fieldID, currentSign);
        DisplayController.displayBoard();
        checkForWinner(parseInt(fieldID));
        
        if(winnerFound) {
            console.log(`Winner is ${currentPlayer.getName()}`)
            if (currentPlayer == player1) {
                player1.updateScore();
            }
            else {
                player2.updateScore();
            }
            round++;
            Gameboard.resetBoard();
            winnerFound = false;
        } else if (!Gameboard.getBoard().includes('')) {
            console.log('Its a Draw')
            draw++
            round++;
            Gameboard.resetBoard();
            winnerFound = false;
        }

        DisplayController.displayBoard();
        DisplayController.displayScore(player1.getScore(), player2.getScore(), draw)
        console.log(round);
        if(round > 3) {
            if (player1.getScore() > player2.getScore()) {
                console.log(`${player1.getName()} Wins`)
            }
            else if (player2.getScore() > player1.getScore()) {
                console.log(`${player2.getName()} Wins`)
            }
            else {
                console.log('Its a draw');
            }
            console.log('Game Ends!')

            return;
        }
        
        if (currentPlayer === player1) {
            currentPlayer = player2;
            currentSign = player2.getSign();
        }
        else {
            currentPlayer = player1;
            currentSign = player1.getSign();
        }

        DisplayController.displayTurn(currentPlayer)

        
    }

    function initPlayers() {
        signs.forEach(sign => {
            if (sign.classList.contains('selected')) {
                player1Sign = sign.textContent
                return;
            }
        });

        if (player1Sign === 'X') {
            player2Sign = 'O';
        }
        else {
            player2Sign = 'X';
        }

        player1 = new Player(player1Name.value, player1Sign, 0);
        player2 = new Player(player2Name.value, player2Sign, 0);
    }

    function toggleSelected() {
        const isSelected = this.classList.contains('selected');
        let unselect;

        if (this.id === 'signX') {
            unselect = document.querySelector('#signO');
        }
        else {
            unselect = document.querySelector('#signX');
        }

        if (!isSelected) {
            this.classList.add('selected');
        }

        if (unselect.classList.contains('selected')) {
            unselect.classList.remove('selected');
        }
        
    }

    function toggleGamePage() {
        const gamePage = document.querySelector('#gamePage');
        const setupPage = document.querySelector('#setupPage');
        const isGamePageActive = gamePage.classList.contains('active');

        if (!isGamePageActive) {
            gamePage.classList.add('active');
            setupPage.classList.remove('active');
        }
        else {
            gamePage.classList.remove('active');
            setupPage.classList.add('active');
        }

    }

    function checkForWinner(index) {
        const winningCombo = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        function winnerTrigger(provenPossibilitiy) {
            if(provenPossibilitiy.every((index) => Gameboard.getField(index) === currentPlayer.getSign())) {
                winnerFound = true;
                // Set class to highlight the winning row
            }
        }

        return winningCombo.filter((combination) => combination.includes(index))
                .some((possibleCombos) => possibleCombos.every((index) => 
                        Gameboard.getField(index) === currentPlayer.getSign() ? winnerTrigger(possibleCombos) : false )
                    )
        
    }

})();

// Controls the display
const DisplayController = (function() {
    const board = Gameboard.getBoard();
    const turnDisplay = document.querySelector('#playerTurn');
    const p1ScoreDisplay = document.querySelector('#player1Score')
    const p2ScoreDisplay = document.querySelector('#player2Score')
    const drawScoreDisplay = document.querySelector('#drawScore')

    let field;

    function displayBoard() {
        for(let i = 0; i < board.length; i++) {
            field = document.getElementById('field-'+i);
            field.textContent = board[i];
        }
    }

    function displayTurn(player) {
        turnDisplay.textContent = `Turn: ${player.getName()}`;

    }

    function displayScore(player1Score, player2Score, draw) {
        p1ScoreDisplay.textContent = player1Score;
        p2ScoreDisplay.textContent = player2Score;
        drawScoreDisplay.textContent = draw;
    }
    
    return {
        displayBoard,
        displayTurn,
        displayScore
    }

})();

