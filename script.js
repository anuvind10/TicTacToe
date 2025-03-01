// Gameboard object
const Gameboard = (function() {
    const board = Array(9).fill('');

    function setField(index, sign) {
        board[index] = sign;
    }

    function getField(index) {
        return board[index];
    }

    function resetBoard() {
        board.fill('');
    }

    return {
        setField,
        resetBoard,
        getBoard: () => [...board],
        getField
    }
})();


// Player Object
function Player(name, sign, score = 0) {
    let playerScore = score;

    const getName = () => name;
    const getSign = () => sign;
    const getScore = () => playerScore;
    const updateScore = () => playerScore++;

    return {
        getName,
        getSign,
        getScore,
        updateScore
    }

}

// Caching DOM elements
const DOMCache = (function () {
    const elements = {
        gameBoardFields: document.querySelectorAll('.gameBoardField'),
        nextRoundPopup: document.querySelector('#nextRound'),
        startGame: document.querySelector('#startBtn'),
        signs: document.querySelectorAll('.signBtn'),
        nameInputs: document.querySelectorAll('.nameInput'),
        gamePage: document.querySelector('#gamePage'),
        setupPage: document.querySelector('#setupPage'),
        player1Win: document.querySelector('#player1Win'),
        player2Win: document.querySelector('#player2Win'),
        nextRoundBtn: document.querySelector('#nextRoundBtn'),
        quitBtn: document.querySelectorAll('.quitBtn'),
        restartBtn: document.querySelector('#restartBtn'),
        overlay: document.querySelector('#overlay'),
    }

    return {
        get: (key) => elements[key]
    };
})();

// Controls the display
const DisplayController = (function() {
    const nameInputs = DOMCache.get('nameInputs');
    const quitBtn = DOMCache.get('quitBtn');
    const overlay = DOMCache.get('overlay');
    
    // displays the game board
    function displayBoard() {
        const gameBoardFields = DOMCache.get('gameBoardFields');
        const board = Gameboard.getBoard();

        var fieldElem;
        var imageElem;

        // clearing the DOM
        gameBoardFields.forEach(field => {
            if (field.hasChildNodes()) {
                field.removeChild(field.firstChild);
            }
        });

        for(var i = 0; i < board.length; i++) {
            fieldElem = document.getElementById('field-'+i);
            imageElem = document.createElement('img');
            imageElem.style.width = '50px';
            if (board[i] !== '') {
                imageElem.src = `./images/${board[i]}_icon_filled2.png`;
            }
            fieldElem.appendChild(imageElem);
        }
    }

    // displays current turn
    function displayTurn() {
        const turnSign = document.querySelector('#playerTurnSign');
        const turnDisplay = document.querySelector('#turnDisplay');

        turnSign.src = `./images/${currentSign}_icon_filled.png`;
        turnDisplay.classList.remove('signX');
        turnDisplay.classList.remove('signO');
        turnDisplay.classList.add(`sign${currentSign}`);
    }

    // displays the score
    function displayScore(player1Score, player2Score, draw) {
        const p1ScoreDisplay = document.querySelector('#player1Score');
        const p2ScoreDisplay = document.querySelector('#player2Score');
        const drawScoreDisplay = document.querySelector('#drawScore');

        p1ScoreDisplay.textContent = player1Score;
        p2ScoreDisplay.textContent = player2Score;
        drawScoreDisplay.textContent = draw;
    }

    // Sets background color for winners pattern
    function setBackgroundColor(fieldIDs) {
        var fieldElem;
        var sign;
        fieldIDs.forEach(fieldID => {
            fieldElem = document.getElementById('field-' + fieldID)
            sign = fieldElem.childNodes[0].src.split('/').pop().split('_')[0];
            fieldElem.classList.add('winner');
            fieldElem.classList.add('sign' + sign);
        });
    }

    function toggleClass(element, className, force = null) {
        if (force === null) {
            element.classList.toggle(className);
        }
        else {
            element.classList[force ? 'add' : 'remove'](className);
        }
    } 

    // toggles pages or theme color
    function toggle(...args) {
        switch (args[0]) {
            // toggles the background color of the window
            case 'background':
                const body = document.querySelector('#body');

                if (args[1] === 'X' || args[1] === 'signX') {
                    body.style.backgroundImage = 'linear-gradient(var(--bg-color1), var(--bg-color2))';
                }
                else {
                    body.style.backgroundImage = 'linear-gradient(var(--bg-color1), var(--bg-color3))';
                }
        
                nameInputs.forEach(input => {
                    if(input.classList.contains('valid')) {
                        if (input.classList.contains('signX')) {
                            toggleClass(input, 'signX', false);
                        }
                        else {
                            toggleClass(input, 'signO', false);
                        }
                        
                        if (args[1] === 'X' || args[1] === 'signX') {
                            toggleClass(input, 'signX', true);
                        }
                        else {
                            toggleClass(input, 'signO', true);
                        }
                    }            
                });
                break;
            
            // toggles the selected sign
            case 'selectedSign':
                const startGame = DOMCache.get('startGame');
                const isSelected = args[1].classList.contains('selected');

                var unselect;

                if (args[1].id === 'signX') {
                    unselect = document.querySelector('#signO');
                    if(!startGame.classList.contains(args[1].id)) {
                        toggleClass(startGame, 'signO', false);
                        toggleClass(startGame, args[1].id, true);
                    }
                }
                else {
                    unselect = document.querySelector('#signX');
                    if(!startGame.classList.contains(args[1].id)) {
                        toggleClass(startGame, 'signX', false);
                        toggleClass(startGame, args[1].id, true);
                    }
                }
                if (!isSelected) {
                    toggleClass(args[1], 'selected', true);
                    if (!args[1].classList.contains(args[1].id)) {
                        toggleClass(args[1], args[1].id, true);
                    }
                }
            
                if (unselect.classList.contains('selected')) {
                    toggleClass(unselect, 'selected', false);
                }
                if (unselect.classList.contains(args[1].id)) {
                    toggleClass(unselect, args[1].id, false);
                }
            
                toggle('background', args[1].id);
                break;
            
            // updates the image file for signs
            case 'signs':
                var fieldElem;
                var sign;

                args[1].forEach(fieldID => {
                    fieldElem = document.getElementById('field-' + fieldID)
                    sign = fieldElem.childNodes[0];
                    sign.src = sign.src.replace('filled2', 'filled');
                });
                break;
            
            // toggles the gamepage
            case 'gamePage':
                const gamePage = DOMCache.get('gamePage');
                const setupPage = DOMCache.get('setupPage');
                const player1Win = DOMCache.get('player1Win');
                const player2Win = DOMCache.get('player2Win');
                const isGamePageActive = gamePage.classList.contains('active');
                const name1 = document.createElement('p');
                const name2 = document.createElement('p');

                name1.innerHTML = args[1].getName();
                name2.innerHTML = args[2].getName();

                player1Win.prepend(name1);
                player2Win.prepend(name2);

                if (!isGamePageActive) {
                    toggleClass(gamePage, 'active', true);
                    toggleClass(setupPage, 'active', false);
                }
                else {
                    toggleClass(gamePage, 'active', false);
                    toggleClass(setupPage, 'active', true);
                }

                if (args[1].getSign() === 'X') {
                    player1Win.style.backgroundColor = 'var(--theme-color)';
                    player2Win.style.backgroundColor = 'var(--theme-color2)';
                }
                else {
                    player1Win.style.backgroundColor = 'var(--theme-color2)';
                    player2Win.style.backgroundColor = 'var(--theme-color)';
                }
                break;
            // toggles the next round page
            case 'nextRound':
                const nextRoundPopup = DOMCache.get('nextRoundPopup');
                const nextRoundBtn = DOMCache.get('nextRoundBtn');
                const roundWinner = document.querySelector('#RoundWinnerSign');
                const resultText = document.querySelector('#resultText');
                const isPopupActive = nextRoundPopup.classList.contains('active');

                if(!isPopupActive) {
                    toggleClass(nextRoundPopup, 'active', true);
                    overlay.style.display = 'block';
                }
                else {
                    toggleClass(nextRoundPopup, 'active', false);
                    overlay.style.display = 'none';
                }

                if (args[1] !== 'reset') {
                    if(args[1] === 'win') {
                        roundWinner.src = `./images/${currentSign}_icon_filled2.png`;
                        roundWinner.style.display = 'block';
                        resultText.textContent = 'Wins the round!'

                        if (currentSign === 'X') {
                            nextRoundBtn.style.backgroundColor = 'var(--theme-color)';
                            quitBtn.forEach(btn => {
                                btn.style.backgroundColor = 'var(--theme-color)';
                            });
                        }
                        else {
                            nextRoundBtn.style.backgroundColor = 'var(--theme-color2)'
                            quitBtn.forEach(btn => {
                                btn.style.backgroundColor = 'var(--theme-color2)'
                            });
                        }
                    }
                    else {
                        roundWinner.style.display = 'none';
                        resultText.textContent = 'it\'s a draw!';
                        nextRoundBtn.style.backgroundColor = 'var(--theme-color3)';
                        quitBtn.forEach(btn => {
                            btn.style.backgroundColor = 'var(--theme-color3)';
                        });
                    }
                }
                break;

            // toggles the player name input fields
            case 'validInput':
                const signs = DOMCache.get('signs');

                args[1].classList.remove('shake');
                if (!args[1].checkValidity()) {
                    toggleClass(args[1], 'valid', false);
                    toggleClass(args[1], 'invalid', true);
                }
                else {
                    toggleClass(args[1], 'valid', true);
                    toggleClass(args[1], 'invalid', false);
                }

                signs.forEach(sign => {
                    if (sign.classList.contains('selected')) {
                        if (sign.id === 'signX' && args[1].classList.contains('signO')) {
                            toggleClass(args[1], 'signO', false);
                        }
                        else if (sign.id === 'signO' && args[1].classList.contains('signX')) {
                            toggleClass(args[1], 'signX', false);
                        }
                        toggleClass(args[1], sign.id, true);
                    }           
                });
                break;

            // toggles the shake animation
            case 'shake':
                nameInputs.forEach(input => {
                    toggleClass(input, 'shake', false);
                    void input.offsetWidth;            
                    if(input.value === '') {
                        toggleClass(input, 'shake', true);
                    }
                });
                break;
            
            // toggles the final result display page
            case 'finalDisplay':
                const restartBtn = DOMCache.get('restartBtn');
                const finalDisplay = document.querySelector('#finalResult');
                const finalWinner = document.querySelector('#finalWinner');
                const winResult = document.querySelectorAll('.winResult');

                toggleClass(finalDisplay, 'active', true);
                overlay.style.display = 'block';

                if (args[1] === 'draw') {
                    winResult.forEach(element => {
                        element.style.display = 'none';
                    });
                    finalWinner.innerHTML = 'It\'s a Draw';
                    finalWinner.style.color = 'white';
                    restartBtn.style.backgroundColor = 'var(--theme-color3)';
                    quitBtn.forEach(btn => {
                        btn.style.backgroundColor = 'var(--theme-color3)';
                    });
                }
                else {
                    winResult.forEach(element => {
                        element.style.display = 'block';
                    });

                    finalWinner.innerHTML = args[2].getName();
                    
                    if (args[2].getSign() === 'X') {
                        restartBtn.style.backgroundColor = 'var(--theme-color)';
                        finalWinner.style.color = 'var(--theme-color)';
                        quitBtn.forEach(btn => {
                            btn.style.backgroundColor = 'var(--theme-color)';
                        });
                    }
                    else {
                        restartBtn.style.backgroundColor = 'var(--theme-color2)';
                        finalWinner.style.color = 'var(--theme-color2)';
                        quitBtn.forEach(btn => {
                            btn.style.backgroundColor = 'var(--theme-color2)';
                        });
                    }
                }
                break;

            default:
                return;
        }
        
    }
    
    return {
        displayBoard,
        displayTurn,
        displayScore,
        setBackgroundColor,
        toggle
    }

})();

// Controls the flow of the game
const GameControl = (function() {
    const startGame = DOMCache.get('startGame');
    const signs = DOMCache.get('signs');
    const gameBoardFields = DOMCache.get('gameBoardFields')
    const nameInputs = DOMCache.get('nameInputs');
    const nextRoundBtn = DOMCache.get('nextRoundBtn');
    const quitBtn = DOMCache.get('quitBtn');
    const restartBtn = DOMCache.get('restartBtn');

    var player1;
    var player2;    
    var currentPlayer;
    var draw = 0;
    var round = 0;
    var winnerFound = false;
    var gameOver = false;
    
    nextRoundBtn.addEventListener('click', startNextRound);
    restartBtn.addEventListener('click', restartGame);

    signs.forEach(sign => {
        sign.addEventListener('click', (event) => {
            DisplayController.toggle('selectedSign', event.target);
        })
    });

    startGame.addEventListener('click', (event) => {
        event.preventDefault();
        initGame();
    })

    nameInputs.forEach(name => {
        name.addEventListener('keyup', (event) => {
            DisplayController.toggle('validInput', event.target);
        })  
    });

    quitBtn.forEach(btn => {
        btn.addEventListener('click', restartGame);
    });

    // initializes the game
    function initGame() {
        var result;

        if (round === 0) {
            result = initPlayers();
            if (result !== 0) {
                DisplayController.toggle('shake');
                return
            }

            DisplayController.toggle('gamePage', player1, player2);
        }
        
        DisplayController.displayBoard();
        if (player1.getSign() === 'X') {
            currentPlayer = player1;
            currentSign = player1.getSign();
        }
        else {
            currentPlayer = player2;
            currentSign = player2.getSign();
        }
        
        gameBoardFields.forEach((field) => field.addEventListener('click', markField));
        DisplayController.displayTurn(currentPlayer);
        DisplayController.displayScore(player1.getScore(), player2.getScore(), draw);
        DisplayController.toggle('background', currentSign);
    }

    // mark the field with the players sign
    function markField() {
        const fieldID = this.getAttribute('data-field-id').split('-')[1];

        // avoid selection of same field
        if(Gameboard.getField(fieldID) !== '') {
            return
        }
        
        Gameboard.setField(fieldID, currentSign);
        DisplayController.displayBoard();
        checkForWinner(parseInt(fieldID));
        
        if(winnerFound) {

            // disable all fields
            gameBoardFields.forEach((field) => field.style.pointerEvents = 'none');
            if (currentPlayer == player1) {
                player1.updateScore();
            }
            else {
                player2.updateScore();
            }
            round++;
            
            if (round < 3){
                if (round === 2) {
                    if ((player1.getScore() === 2 && player2.getScore() === 0) || 
                        (player2.getScore() === 2 && player1.getScore() === 0)) {
                            gameOver = true;
                    }
                }

                if(!gameOver) {
                    setTimeout(DisplayController.toggle, 1000, 'nextRound', 'win');
                }
                else {
                    setTimeout(DisplayController.toggle, 1000, 'finalDisplay', 'win', currentPlayer);
                }
            }
            winnerFound = false;
        } else if (!Gameboard.getBoard().includes('')) {
            gameBoardFields.forEach((field) => field.style.pointerEvents = 'none');
            draw++
            round++;
            if (draw === 2) {
                setTimeout(DisplayController.toggle, 1000, 'finalDisplay', 'draw');
            }
            else if (round < 3){
                setTimeout(DisplayController.toggle, 1000, 'nextRound', 'draw');
            }
        } else {
            if (currentPlayer === player1) {
                currentPlayer = player2;
                currentSign = player2.getSign();
            }
            else {
                currentPlayer = player1;
                currentSign = player1.getSign();
            }
    
            DisplayController.toggle('background', currentSign);
            DisplayController.displayTurn();
        }

        DisplayController.displayScore(player1.getScore(), player2.getScore(), draw);
        
        if (!gameOver) {
            if(round >= 3) {
                const winner = player1.getScore() > player2.getScore() ? player1: player2.getScore() > player1.getScore() ? player2 : null;
                
                setTimeout(DisplayController.toggle, 1000, 'finalDisplay', winner ? 'win' : 'draw', winner);
    
                return;
            }
        }
    }

    // initialize players
    function initPlayers() {
        const player1Name = document.querySelector('#player1');
        const player2Name = document.querySelector('#player2');

        var player1Sign;
        var player2Sign;

        // both players names should be entered
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

        player1 = new Player(player1Name.value, player1Sign);
        player2 = new Player(player2Name.value, player2Sign);

        return 0;
    }

    // starts next round
    function startNextRound() {
        const gameBoardFields = document.querySelectorAll('.gameBoardField');

        // enable all the fields
        gameBoardFields.forEach((field) => field.style.pointerEvents = 'auto');

        DisplayController.toggle('nextRound', 'reset');
        gameBoardFields.forEach(fieldElem => {
            if(fieldElem.classList.contains('winner')) {
                fieldElem.classList.remove('winner');
            }
        });
        Gameboard.resetBoard();
        DisplayController.displayBoard();
        initGame();
    }

    // checks for winner
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

        // finds the winning field combination
        function winnerTrigger(provenPossibilitiy) {
            if(provenPossibilitiy.every((index) => Gameboard.getField(index) === currentPlayer.getSign())) {
                winnerFound = true;
                DisplayController.toggle('signs', provenPossibilitiy);
                DisplayController.setBackgroundColor(provenPossibilitiy);
            }
        }

        // check each winning fields combination to find a winner
        return winningCombo
                .filter((combination) => combination.includes(index))
                .some((possibleCombos) => possibleCombos.every((index) => 
                        Gameboard.getField(index) === currentPlayer.getSign() ? winnerTrigger(possibleCombos) : false )
                    )
        
    }

    // restarts the game
    function restartGame() {
        const overlay = DOMCache.get('overlay');
        const gamePage = DOMCache.get('gamePage');
        const setupPage = DOMCache.get('setupPage');
        const nextRoundPopup = DOMCache.get('nextRoundPopup');
        const player1Win = DOMCache.get('player1Win');
        const player2Win = DOMCache.get('player2Win');
        const finalDisplay = document.querySelector('#finalResult');

        round = 0;
        draw = 0;
        gameOver = false;
        Gameboard.resetBoard();
        gamePage.classList.remove('active');
        setupPage.classList.add('active');
        finalDisplay.classList.remove('active');
        nextRoundPopup.classList.remove('active');
        player1Win.removeChild(player1Win.firstChild);
        player2Win.removeChild(player2Win.firstChild);
        overlay.style.display = 'none';

        nameInputs.forEach(input => {
            input.value = '';
        });
        
        nameInputs.forEach(input => {
            input.classList.remove('signX');
            input.classList.remove('signO');
            input.classList.remove('valid');
        });

        gameBoardFields.forEach(field => {
            if (field.classList.contains('winner')) {
                field.classList.remove('winner');
                field.classList.remove('signO');
                field.classList.remove('signX');
            }
        });

        signs.forEach(sign => {
            if(sign.id === 'signX' && !sign.classList.contains('selected')) {
                sign.classList.add('selected');
            }
            else if (sign.id === 'signO') {
                sign.classList.remove('selected');
            }
        });

        gameBoardFields.forEach((field) => field.style.pointerEvents = 'auto');

        if(!startGame.classList.contains('signX')) {
            startGame.classList.add('signX');
        }
        startGame.classList.remove('signO');

        DisplayController.toggle('background', 'X');
    }

})();