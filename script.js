// Gameboard object that updates the actual board
const Gameboard = (function() {
    let board = ['','','','','','','','',''];

    function setField(index, sign) {
        board[index] = sign;
    }

    function getBoard() {
        return board;
    }

    function resetField() {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return {
        setField,
        resetField,
        getBoard
    }
})();


// Player Object
function Player(name, sign) {
    const playerName = name;
    const playerSign = sign;

    const getName = () => {return name};
    const getSign = () => {return sign};

    return {
        getName,
        getSign
    }

}

// GameControl Object to control the flow of the game
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

    signs.forEach(sign => {
        sign.addEventListener('click', toggleSelected)
    });

    startGame.addEventListener('click', initGame)

    function initGame() {
        initPlayers();
        currentPlayer = player1;
        currentSign = player1.getSign();
        gameBoardFields.forEach((field) => field.addEventListener('click', markField))
        DisplayController.displayTurn(currentPlayer);
    }

    function markField() {
        const fieldID = this.getAttribute('data-field-id').split('-')[1];

        Gameboard.setField(fieldID, currentSign);
        DisplayController.displayBoard();
        
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

        player1 = new Player(player1Name.value, player1Sign);
        player2 = new Player(player2Name.value, player2Sign);
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

})();

const DisplayController = (function() {
    const board = Gameboard.getBoard();
    const turnDisplay = document.querySelector('#playerTurn');

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

    function displayScore() {

    }
    
    return {
        displayBoard,
        displayTurn,
        displayScore
    }

})();

