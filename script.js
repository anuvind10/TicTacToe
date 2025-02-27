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

// Controls the display
const DisplayController = (function() {
    const board = Gameboard.getBoard();
    const turnSign = document.querySelector('#playerTurnSign');
    const turnDisplay = document.querySelector('#turnDisplay');
    const p1ScoreDisplay = document.querySelector('#player1Score');
    const p2ScoreDisplay = document.querySelector('#player2Score');
    const drawScoreDisplay = document.querySelector('#drawScore');
    const gameBoardFields = document.querySelectorAll('.gameBoardField');
    const body = document.querySelector('#body')
    const nextRoundPopup = document.querySelector('#nextRound');
    const winResult = document.querySelectorAll('.winResult');
    const startGame = document.querySelector('#startButton');
    const signs = document.querySelectorAll('.signBtn');
    const nameInputs = document.querySelectorAll('.nameInput');
    const gamePage = document.querySelector('#gamePage');
    const setupPage = document.querySelector('#setupPage');
    const player1Win = document.querySelector('#player1Win');
    const player2Win = document.querySelector('#player2Win');
    const nextRoundBtn = document.querySelector('#nextRoundBtn');
    const quitBtn = document.querySelector('#quitBtn');
    const restartBtn = document.querySelector('#restartBtn');
    const overlay = document.querySelector('#overlay');
    
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
            imageElem.style.width = '50px';
            if (board[i] !== '') {
                imageElem.src = `./images/${board[i]}_icon_filled2.png`;
            }
            fieldElem.appendChild(imageElem);
        }
    }

    function displayTurn() {
        turnSign.src = `./images/${currentSign}_icon_filled.png`;
        turnDisplay.classList.remove('signX');
        turnDisplay.classList.remove('signO');
        turnDisplay.classList.add(`sign${currentSign}`);
    }

    function displayScore(player1Score, player2Score, draw) {
        p1ScoreDisplay.textContent = player1Score;
        p2ScoreDisplay.textContent = player2Score;
        drawScoreDisplay.textContent = draw;
    }

    function setBackground(fieldIDs) {
        var fieldElem;
        var sign;
        fieldIDs.forEach(fieldID => {
            fieldElem = document.getElementById('field-' + fieldID)
            sign = fieldElem.childNodes[0].src.split('/').pop().split('_')[0];
            fieldElem.classList.add('winner');
            fieldElem.classList.add('sign' + sign);
        });
    }

    function toggleBackground(sign) {
        // if (sign === 'X' || sign === 'signX') {
        //     body.style.backgroundImage = 'linear-gradient(var(--bg-color1), var(--bg-color2))';
        // }
        // else {
        //     body.style.backgroundImage = 'linear-gradient(var(--bg-color1), var(--bg-color3))'
        // }

        // nameInputs.forEach(input => {
        //     if(input.classList.contains('valid')) {
        //         if (input.classList.contains('signX')) {
        //             input.classList.remove('signX');
        //         }
        //         else {
        //             input.classList.remove('signO');
        //         }
                
        //         if (sign === 'X' || sign === 'signX') {
        //             input.classList.add('signX');
        //         }
        //         else {
        //             input.classList.add('signO');
        //         }
        //     }            
        // });
    }

    function toggleSelected() {
        // const isSelected = this.classList.contains('selected');
        // let unselect;

        // if (this.id === 'signX') {
        //     unselect = document.querySelector('#signO');
        //     if(!startGame.classList.contains(this.id)) {
        //         startGame.classList.remove('signO');
        //         startGame.classList.add(this.id);
        //     }
        // }
        // else {
        //     unselect = document.querySelector('#signX');
        //     if(!startGame.classList.contains(this.id)) {
        //         startGame.classList.remove('signX');
        //         startGame.classList.add(this.id);
        //     }
        // }
        // if (!isSelected) {
        //     this.classList.add('selected');
        //     if (!this.classList.contains(this.id)) {
        //         this.classList.add(this.id);
        //     }
        // }

        // if (unselect.classList.contains('selected')) {
        //     unselect.classList.remove('selected');
        // }
        // if (unselect.classList.contains(this.id)) {
        //     unselect.classList.remove(this.id);
        // }

        // toggleBackground(this.id)
    }

    function toggleSigns(fieldIDs) {
        // var fieldElem;
        // var sign;
        // fieldIDs.forEach(fieldID => {
        //     fieldElem = document.getElementById('field-' + fieldID)
        //     sign = fieldElem.childNodes[0];
        //     sign.src = sign.src.replace('filled2', 'filled');
        // });
    }

    function toggleGamePage(player1, player2) {
        // const isGamePageActive = gamePage.classList.contains('active');
        // const name1 = document.createElement('p');
        // const name2 = document.createElement('p');

        // name1.innerHTML = player1.getName();
        // name2.innerHTML = player2.getName();

        // player1Win.prepend(name1);
        // player2Win.prepend(name2);

        // if (!isGamePageActive) {
        //     gamePage.classList.add('active');
        //     setupPage.classList.remove('active');
        // }
        // else {
        //     gamePage.classList.remove('active');
        //     setupPage.classList.add('active');
        // }

        // if (player1.getSign() === 'X') {
        //     player1Win.style.backgroundColor = 'var(--theme-color)';
        //     player2Win.style.backgroundColor = 'var(--theme-color2)';
        // }
        // else {
        //     player1Win.style.backgroundColor = 'var(--theme-color2)';
        //     player2Win.style.backgroundColor = 'var(--theme-color)';
        // }

    }

    function toggleNextRoundPopup(result) {
        // const roundWinner = document.querySelector('#RoundWinnerSign');
        // const resultText = document.querySelector('#resultText');
        // const isPopupActive = nextRoundPopup.classList.contains('active');

        // if(!isPopupActive) {
        //     nextRoundPopup.classList.add('active');
        //     overlay.style.display = 'block';
        // }
        // else {
        //     nextRoundPopup.classList.remove('active');
        //     overlay.style.display = 'none';
        // }

        // if (result !== 'reset') {
        //     if (currentSign === 'X') {
        //         nextRoundBtn.style.backgroundColor = 'var(--theme-color)'
        //         quitBtn.style.backgroundColor = 'var(--theme-color)'
        //     }
        //     else {
        //         nextRoundBtn.style.backgroundColor = 'var(--theme-color2)'
        //         quitBtn.style.backgroundColor = 'var(--theme-color2)'
        //     }
    
        //     if(result === 'win') {
        //         roundWinner.src = `./images/${currentSign}_icon_filled2.png`;
        //         roundWinner.style.display = 'block';
        //         resultText.textContent = 'Wins the round!'
        //     }
        //     else {
        //         roundWinner.style.display = 'none';
        //         resultText.textContent = 'it\'s a draw!';
        //     }
        // }
    }

    function toggleValidInput() {
        // this.classList.remove('shake');
        // if (!this.checkValidity()) {
        //     this.classList.remove('valid');
        //     this.classList.add('invalid');
        // }
        // else {
        //     this.classList.add('valid');
        //     this.classList.remove('invalid');
        // }

        // signs.forEach(sign => {
        //     if (sign.classList.contains('selected')) {
        //         if (sign.id === 'signX' && this.classList.contains('signO')) {
        //             this.classList.remove('signO');
        //         }
        //         else if (sign.id === 'signO' && this.classList.contains('signX')) {
        //             this.classList.remove('signX');
        //         }
        //         this.classList.add(sign.id);
        //     }           
        // });
    }

    function toggleShake() {
        // nameInputs.forEach(input => {
        //     input.classList.remove('shake')
        //     void input.offsetWidth;            
        //     if(input.value === '') {
        //         input.classList.add('shake');
        //     }
        // });
    }

    function toggleFinalDisplay(result, winner='none') {
        // const finalDisplay = document.querySelector('#finalResult');
        // const finalWinner = document.querySelector('#finalWinner');
        // if (!finalDisplay.classList.contains('active')) {
        //     finalDisplay.classList.add('active');
        //     overlay.style.display = 'block';
        // }

        // if (result === 'draw') {
        //     winResult.forEach(element => {
        //         element.style.display = 'none';
        //     });
        //     finalWinner.innerHTML = 'It\'s a Draw';
        //     finalWinner.style.color = 'white';
        //     restartBtn.style.backgroundColor = 'var(--theme-color3)';
        // }
        // else {
        //     winResult.forEach(element => {
        //         element.style.display = 'block';
        //     });
        //     finalWinner.innerHTML = winner.getName();
            
        //     if (winner.getSign() === 'X') {
        //         restartBtn.style.backgroundColor = 'var(--theme-color)';
        //         finalWinner.style.color = 'var(--theme-color)';
        //     }
        //     else {
        //         restartBtn.style.backgroundColor = 'var(--theme-color2)';
        //         finalWinner.style.color = 'var(--theme-color2)';
        //     }
        // }

    }

    function toggle(trigger, sign, fieldIDs, player1, player2, result, winner='none', event) {
        switch (trigger) {
            case 'background':
                if (sign === 'X' || sign === 'signX') {
                    body.style.backgroundImage = 'linear-gradient(var(--bg-color1), var(--bg-color2))';
                }
                else {
                    body.style.backgroundImage = 'linear-gradient(var(--bg-color1), var(--bg-color3))'
                }
        
                nameInputs.forEach(input => {
                    if(input.classList.contains('valid')) {
                        if (input.classList.contains('signX')) {
                            input.classList.remove('signX');
                        }
                        else {
                            input.classList.remove('signO');
                        }
                        
                        if (sign === 'X' || sign === 'signX') {
                            input.classList.add('signX');
                        }
                        else {
                            input.classList.add('signO');
                        }
                    }            
                });
                break;

            case 'selectedSign':
                const isSelected = event.classList.contains('selected');
                let unselect;

                if (event.id === 'signX') {
                    unselect = document.querySelector('#signO');
                    if(!startGame.classList.contains(event.id)) {
                        startGame.classList.remove('signO');
                        startGame.classList.add(event.id);
                    }
                }
                else {
                    unselect = document.querySelector('#signX');
                    if(!startGame.classList.contains(event.id)) {
                        startGame.classList.remove('signX');
                        startGame.classList.add(event.id);
                    }
                }
                if (!isSelected) {
                    event.classList.add('selected');
                    if (!event.classList.contains(event.id)) {
                        event.classList.add(event.id);
                    }
                }
            
                if (unselect.classList.contains('selected')) {
                    unselect.classList.remove('selected');
                }
                if (unselect.classList.contains(event.id)) {
                    unselect.classList.remove(event.id);
                }
            
                toggle('background', event.id);
                break;
            
            case 'signs':
                var fieldElem;
                var sign;
                fieldIDs.forEach(fieldID => {
                    fieldElem = document.getElementById('field-' + fieldID)
                    sign = fieldElem.childNodes[0];
                    sign.src = sign.src.replace('filled2', 'filled');
                });
                break;
            
            case 'gamePage':
                const isGamePageActive = gamePage.classList.contains('active');
                const name1 = document.createElement('p');
                const name2 = document.createElement('p');

                name1.innerHTML = player1.getName();
                name2.innerHTML = player2.getName();

                player1Win.prepend(name1);
                player2Win.prepend(name2);

                if (!isGamePageActive) {
                    gamePage.classList.add('active');
                    setupPage.classList.remove('active');
                }
                else {
                    gamePage.classList.remove('active');
                    setupPage.classList.add('active');
                }

                if (player1.getSign() === 'X') {
                    player1Win.style.backgroundColor = 'var(--theme-color)';
                    player2Win.style.backgroundColor = 'var(--theme-color2)';
                }
                else {
                    player1Win.style.backgroundColor = 'var(--theme-color2)';
                    player2Win.style.backgroundColor = 'var(--theme-color)';
                }
                break;

            case 'nextRound':
                const roundWinner = document.querySelector('#RoundWinnerSign');
                const resultText = document.querySelector('#resultText');
                const isPopupActive = nextRoundPopup.classList.contains('active');

                if(!isPopupActive) {
                    nextRoundPopup.classList.add('active');
                    overlay.style.display = 'block';
                }
                else {
                    nextRoundPopup.classList.remove('active');
                    overlay.style.display = 'none';
                }

                if (result !== 'reset') {
                    if (currentSign === 'X') {
                        nextRoundBtn.style.backgroundColor = 'var(--theme-color)'
                        quitBtn.style.backgroundColor = 'var(--theme-color)'
                    }
                    else {
                        nextRoundBtn.style.backgroundColor = 'var(--theme-color2)'
                        quitBtn.style.backgroundColor = 'var(--theme-color2)'
                    }
            
                    if(result === 'win') {
                        roundWinner.src = `./images/${currentSign}_icon_filled2.png`;
                        roundWinner.style.display = 'block';
                        resultText.textContent = 'Wins the round!'
                    }
                    else {
                        roundWinner.style.display = 'none';
                        resultText.textContent = 'it\'s a draw!';
                    }
                }
                break;

            case 'validInput':
                event.classList.remove('shake');
                if (!event.checkValidity()) {
                    event.classList.remove('valid');
                    event.classList.add('invalid');
                }
                else {
                    event.classList.add('valid');
                    event.classList.remove('invalid');
                }

                signs.forEach(sign => {
                    if (sign.classList.contains('selected')) {
                        if (sign.id === 'signX' && event.classList.contains('signO')) {
                            event.classList.remove('signO');
                        }
                        else if (sign.id === 'signO' && event.classList.contains('signX')) {
                            event.classList.remove('signX');
                        }
                        event.classList.add(sign.id);
                    }           
                });
                break;

            case 'shake':
                nameInputs.forEach(input => {
                    input.classList.remove('shake')
                    void input.offsetWidth;            
                    if(input.value === '') {
                        input.classList.add('shake');
                    }
                });
                break;
            
            case 'finalDisplay':
                const finalDisplay = document.querySelector('#finalResult');
                const finalWinner = document.querySelector('#finalWinner');
                if (!finalDisplay.classList.contains('active')) {
                    finalDisplay.classList.add('active');
                    overlay.style.display = 'block';
                }

                if (result === 'draw') {
                    winResult.forEach(element => {
                        element.style.display = 'none';
                    });
                    finalWinner.innerHTML = 'It\'s a Draw';
                    finalWinner.style.color = 'white';
                    restartBtn.style.backgroundColor = 'var(--theme-color3)';
                }
                else {
                    winResult.forEach(element => {
                        element.style.display = 'block';
                    });
                    finalWinner.innerHTML = winner.getName();
                    
                    if (winner.getSign() === 'X') {
                        restartBtn.style.backgroundColor = 'var(--theme-color)';
                        finalWinner.style.color = 'var(--theme-color)';
                    }
                    else {
                        restartBtn.style.backgroundColor = 'var(--theme-color2)';
                        finalWinner.style.color = 'var(--theme-color2)';
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
        setBackground,
        toggleBackground,
        toggleSelected,
        toggleSigns,
        toggleGamePage,
        toggleNextRoundPopup,
        toggleValidInput,
        toggleShake,
        toggleFinalDisplay,
        toggle
    }

})();

// Controls the flow of the game
const GameControl = (function() {
    const startGame = document.querySelector('#startButton');
    const signs = document.querySelectorAll('.signBtn');
    const gameBoardFields = document.querySelectorAll('.gameBoardField')
    const player1Name = document.querySelector('#player1');
    const player2Name = document.querySelector('#player2');
    const nameInputs = document.querySelectorAll('.nameInput');
    const nextRoundBtn = document.querySelector('#nextRoundBtn');
    const quitBtn = document.querySelector('#quitBtn');
    const restartBtn = document.querySelector('#restartBtn');
    const gamePage = document.querySelector('#gamePage');
    const setupPage = document.querySelector('#setupPage');
    
    const player1Win = document.querySelector('#player1Win');
    const player2Win = document.querySelector('#player2Win');
    


    var player1Sign;
    var player2Sign;
    var player1;
    var player2;    
    var currentPlayer;
    var draw = 0;
    var round = 0;
    var winnerFound = false;
    var result;
    var gameOver = false;


    signs.forEach(sign => {
        // sign.addEventListener('click', DisplayController.toggleSelected)
        sign.addEventListener('click', (event) => {
            DisplayController.toggle('selectedSign', '','','','','','',event.target);
        })
    });

    startGame.addEventListener('click', (event) => {
        event.preventDefault();
        initGame()
    })

    nameInputs.forEach(name => {
        // name.addEventListener('keyup', DisplayController.toggleValidInput())
        name.addEventListener('keyup', (event) => {
            DisplayController.toggle('validInput', '','','','','','',event.target)
        })  
    });

    nextRoundBtn.addEventListener('click', startNextRound);

    quitBtn.addEventListener('click', restartGame);
    restartBtn.addEventListener('click', restartGame);

    function initGame() {
        if (round === 0) {
            result = initPlayers();
            if (result !== 0) {
                // DisplayController.toggleShake();
                DisplayController.toggle('shake');
                return
            }

            // DisplayController.toggleGamePage(player1, player2);
            DisplayController.toggle('gamePage', '', '', player1, player2);
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
        
        gameBoardFields.forEach((field) => field.addEventListener('click', markField))
        DisplayController.displayTurn(currentPlayer);
        DisplayController.displayScore(player1.getScore(), player2.getScore(), draw)
        // DisplayController.toggleBackground(currentSign);
        DisplayController.toggle('background', currentSign);
    }

    function markField() {
        const fieldID = this.getAttribute('data-field-id').split('-')[1];

        if(Gameboard.getField(fieldID) !== '') {
            return
        }
        
        Gameboard.setField(fieldID, currentSign);
        DisplayController.displayBoard();
        checkForWinner(parseInt(fieldID));
        
        if(winnerFound) {
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
                    // setTimeout(DisplayController.toggleNextRoundPopup, 1000, 'win');
                    setTimeout(DisplayController.toggle, 1000, 'nextRound', '', '', '', '', 'win');
                }
                else {
                    // setTimeout(DisplayController.toggleFinalDisplay, 1000, 'win', currentPlayer);
                    setTimeout(DisplayController.toggle, 1000, 'finalDisplay', '', '', '', '', 'win', currentPlayer);
                }
            }
            winnerFound = false;
        } else if (!Gameboard.getBoard().includes('')) {
            gameBoardFields.forEach((field) => field.style.pointerEvents = 'none');
            draw++
            round++;
            if (draw === 2) {
                // setTimeout(DisplayController.toggleFinalDisplay, 1000, 'draw');
                setTimeout(DisplayController.toggle, 1000, 'finalDisplay', '', '', '', '', 'draw');
            }
            else if (round < 3){
                // setTimeout(DisplayController.toggleNextRoundPopup, 1000, 'draw');
                setTimeout(DisplayController.toggle, 1000, 'finalDisplay', '', '', '', '', 'draw');
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
    
            // DisplayController.toggleBackground(currentSign)
            DisplayController.toggle('background', currentSign);

            DisplayController.displayTurn()
        }

        DisplayController.displayScore(player1.getScore(), player2.getScore(), draw)
        
        if (!gameOver) {
            if(round >= 3) {
                if (player1.getScore() > player2.getScore()) {
                    // setTimeout(DisplayController.toggleFinalDisplay, 1000, 'win', player1);
                    setTimeout(DisplayController.toggle, 1000, 'finalDisplay', '', '', '', '', 'win', player1);

                }
                else if (player2.getScore() > player1.getScore()) {
                    // setTimeout(DisplayController.toggleFinalDisplay, 1000, 'win', player2);
                    setTimeout(DisplayController.toggle, 1000, 'finalDisplay', '', '', '', '', 'win', playplayer2er1);

                }
                else {
                    // setTimeout(DisplayController.toggleFinalDisplay, 1000, 'draw');
                    setTimeout(DisplayController.toggle, 1000, 'finalDisplay', '', '', '', '', 'draw');
                }
    
                return;
            }
        }
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
        gameBoardFields.forEach((field) => field.style.pointerEvents = 'auto');

        // DisplayController.toggleNextRoundPopup('reset');
        setTimeout(DisplayController.toggle, 1000, 'nextRound', '', '', '', '', 'reset');
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
                // DisplayController.toggleSigns(provenPossibilitiy);
                DisplayController.toggle('signs', '', provenPossibilitiy);
                DisplayController.setBackground(provenPossibilitiy);
            }
        }

        return winningCombo.filter((combination) => combination.includes(index))
                .some((possibleCombos) => possibleCombos.every((index) => 
                        Gameboard.getField(index) === currentPlayer.getSign() ? winnerTrigger(possibleCombos) : false )
                    )
        
    }

    function restartGame() {
        const finalDisplay = document.querySelector('#finalResult');

        Gameboard.resetBoard();
        gamePage.classList.remove('active');
        setupPage.classList.add('active');
        finalDisplay.classList.remove('active');
        overlay.style.display = 'none';
        nameInputs.forEach(input => {
            input.value = '';
        });

        round = 0;
        draw = 0;
        nameInputs.forEach(input => {
            input.classList.remove('signX');
            input.classList.remove('signO');
            input.classList.remove('valid');
        });

        player1Win.removeChild(player1Win.firstChild);
        player2Win.removeChild(player2Win.firstChild);

        gameBoardFields.forEach(field => {
            if (field.classList.contains('winner')) {
                field.classList.remove('winner');
                field.classList.remove('signO');
                field.classList.remove('signX');
            }
        });

        gameBoardFields.forEach((field) => field.style.pointerEvents = 'auto');
        gameOver = false;
        // DisplayController.toggleBackground('X');
        DisplayController.toggle('background', 'X');
        signs.forEach(sign => {
            if(sign.id === 'signX' && !sign.classList.contains('selected')) {
                sign.classList.add('selected');
            }
            else if (sign.id === 'signO') {
                sign.classList.remove('selected');
            }
        });

        if(!startGame.classList.contains('signX')) {
            startGame.classList.add('signX');
        }
        startGame.classList.remove('signO');
    }

})();



