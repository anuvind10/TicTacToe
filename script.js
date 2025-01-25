// Gameboard object that updates the actual board
const Gameboard = (function() {
    let board = ['','','','','','','','',''];

    function setField(index, sign) {
        board[index] = sign;
    }

    function getBoard() {
        console.log(board);
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

// Make this an IIFE
const GameControl = (function() {
    let name = prompt('First Player Name: ');
    let sign = prompt('Which sign do you choose? (X/O): ');

    const player1 = new Player(name, sign);

    name = prompt('Second Player Name: ');
    if (sign == 'X') {
        const player2 = new Player(name, 'Y');
    }
    else {
        const player2 = new player1(name, 'X');
    }

    console.log("Game Starts Now!");

    let index = prompt('Player 1, choose your index: ');

    Gameboard.setField(index, player1.getSign());
    Gameboard.getBoard();
});

