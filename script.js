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
    const player1Name = document.querySelector('#player1');
    const player2Name = document.querySelector('#player2');
    const nameInputs = document.querySelectorAll('.nameInput');
    const nextRoundBtn = document.querySelector('#nextRoundBtn');

    var player1Sign;
    var player2Sign;
    var player1;
    var player2;    
    var currentPlayer;
    var draw = 0;
    var round = 0;
    var winnerFound = false;
    var result;


    signs.forEach(sign => {
        sign.addEventListener('click', toggleSelected)
    });

    startGame.addEventListener('click', (event) => {
        event.preventDefault();
        initGame()
    })

    nameInputs.forEach(name => {
        name.addEventListener('keyup', toggleValidInput)     
    });

    nextRoundBtn.addEventListener('click', startNextRound);

    function initGame() {
        if (round === 0) {
            result = initPlayers();
            if (result !== 0) {
                toggleShake();
                return
            }

            toggleGamePage();
        }
        
        round++;
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
            setTimeout(toggleNextRoundPopup, 2000);
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

        if ((player1Name.value === '' && player2Name.value === '') || 
            (player1Name.value === '' || player2Name.value === '')) {
                return 1
        }

        signs.forEach(sign => {
            if (sign.classList.contains('selected')) {
                const fileName = sign.src.split('/').pop()
                player1Sign = fileName.split('_')[0];
                return;
            }
        });

        player1Sign === 'X' ? player2Sign = 'O' : player2Sign = 'X';

        player1 = new Player(player1Name.value, player1Sign, 0);
        player2 = new Player(player2Name.value, player2Sign, 0);

        return 0;
    }

    function startNextRound() {
        const gameBoardFields = document.querySelectorAll('.gameBoardField');

        toggleNextRoundPopup();
        gameBoardFields.forEach(fieldElem => {
            if(fieldElem.classList.contains('winner')) {
                fieldElem.classList.remove('winner');
            }
        });
        Gameboard.resetBoard();
        DisplayController.displayBoard();
        isNewRound = false;
        initGame();
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

    function toggleNextRoundPopup() {
        const overlay = document.querySelector('#overlay');
        const nextRoundPopup = document.querySelector('#nextRound');
        const isPopupActive = nextRoundPopup.classList.contains('active');

        if(!isPopupActive) {
            nextRoundPopup.classList.add('active');
            overlay.style.display = 'block';
        }
        else {
            nextRoundPopup.classList.remove('active');
            overlay.style.display = 'none';
        }
    }


    function toggleValidInput() {
        this.classList.remove('shake');
        if (!this.checkValidity()) {
            this.classList.remove('valid');
            this.classList.add('invalid');
        }
        else {
            this.classList.add('valid');
            this.classList.remove('invalid');
        }
    }

    function toggleShake() {
        nameInputs.forEach(input => {
            input.classList.remove('shake')
            void input.offsetWidth;            
            if(input.value === '') {
                input.classList.add('shake');
            }
        });
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
                DisplayController.setBackground(provenPossibilitiy);
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
    const p1ScoreDisplay = document.querySelector('#player1Score');
    const p2ScoreDisplay = document.querySelector('#player2Score');
    const drawScoreDisplay = document.querySelector('#drawScore');
    const gameBoardFields = document.querySelectorAll('.gameBoardField');
    

    function displayBoard() {
        var fieldElem;
        var imageElem;

        gameBoardFields.forEach(field => {
            if (field.hasChildNodes()) {
                field.removeChild(field.firstChild);
            }
        });

        for(let i = 0; i < board.length; i++) {
            fieldElem = document.getElementById('field-'+i);
            imageElem = document.createElement('img');
            if (board[i] !== '') {
                imageElem.src = `./images/${board[i]}_icon_filled.png`;
            }
            fieldElem.appendChild(imageElem);
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

    function setBackground(fieldIDs) {
        fieldIDs.forEach(fieldID => {
            const fieldElem = document.getElementById('field-' + fieldID)
            fieldElem.classList.add('winner');
        });
    }
    
    return {
        displayBoard,
        displayTurn,
        displayScore,
        setBackground
    }

})();

