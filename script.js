var scores, roundScore, activePlayer, gameOver;

scores = [0,0];
roundScore = 0;
activePlayer = 0;
gameOver = false;

resetState();

function buttonState(state){
    document.querySelector('.btn.btn--roll').disabled = state;
    document.querySelector('.btn.btn--hold').disabled = state;
}

function resetState(){
    document.querySelector('#score--0').textContent = '0';
    document.querySelector('#score--1').textContent = '0';
    document.querySelector('#current--0').textContent = '0';
    document.querySelector('#current--1').textContent = '0';
    document.querySelector('#name--0').textContent = 'PLAYER 1';
    document.querySelector('#name--1').textContent = 'PLAYER 2';
    scores = [0,0];
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    buttonState(false);
    activeName();
}

function activeName(){
    if (activePlayer == 0){
        document.querySelector('#name--0').style.border = '3px solid #bf2e34';
        document.querySelector('#name--1').style.border = 'none';
        
    } else {
        document.querySelector('#name--0').style.border = 'none';
        document.querySelector('#name--1').style.border = '3px solid #bf2e34';
    }
}

function noBorder(){
    document.querySelector('#name--0').style.border = 'none';
    document.querySelector('#name--1').style.border = 'none';
}

// Roll Dice
document.querySelector('.btn.btn--roll').addEventListener('click', function(){
    
    // 1. random number
    var dice = Math.floor(Math.random()*6) + 1;

    //Display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    

    //update round score IF rolled !== 1, if 1 change player and lose score
    if (dice!==1){
        roundScore += dice;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
        

    } else {
        roundScore = 0;
        document.querySelector('#current--' + activePlayer).textContent = '0';
        activeName();
        changePlayer();
    }
});

// Hold button
document.querySelector('.btn.btn--hold').addEventListener('click', function(){
    scores[activePlayer] += roundScore;
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    roundScore = 0;
    document.querySelector('#current--' + activePlayer).textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    if(scores[activePlayer] >= 100) {
        noBorder();
        buttonState(true);
        document.querySelector('#name--' + activePlayer).textContent = 'PLAYER ' + (activePlayer + 1) + ' IS THE WINNER!';
    } else {
        changePlayer();
    }
});


function changePlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    activeName()
    // if (activePlayer == 0){
    //      activePlayer = 1;
    // } else {
    //     activePlayer = 0;
    // }
        
}

// New Game
document.querySelector('.btn.btn--new').addEventListener('click', function(){
    resetState();
})


