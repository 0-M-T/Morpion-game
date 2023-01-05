// Récupère toutes les cellules du tableau
const cells = document.querySelectorAll('[data-cell]');

///Def variables
var gameStatus,endGameStatus;
var playerOne, playerTwo,playerTurn= [];
var counter=0;

// Pour initialiser les informations des joueurs
function init() {
    gameStatus = document.getElementById('gameStatus');
    endGameStatus = document.getElementById('endGameStatus');

    /// On récupère les input
    playerOne = [document.getElementById('playerOne').value, document.getElementById('pattern1').value];
    playerTwo = [document.getElementById('playerTwo').value, document.getElementById('pattern2').value];

    /// On teste s'il n'y a rien dans les noms et les patterns
    if (playerOne[0] == "") {
        playerOne[0] = "Joueur 1";
    }
    if (playerTwo[0] == "") {
        playerTwo[0] = "Joueur 2";
    }

    if (playerOne[1] == "") {
        playerOne[1] = "X";
    }
    if (playerTwo[1] == "") {
        playerTwo[1] = "O";
    }

    /// Si les deux joueurs rentrent les mêmes informations
    if (playerOne[1] == playerTwo[1]) {
        playerOne[1] = "X";
        playerTwo[1] = "O";
    }

    if (playerOne[0] == playerTwo[0]) {
        playerOne[0] = "Joueur 1";
        playerTwo[0] = "Joueur 2";
    }

    /// On choisit un premier joueur au hasard
    if (Math.random() <= 0.5) {
        playerTurn = playerOne;
    }
    else {
        playerTurn = playerTwo;
    }

    gameStatus.innerHTML = "C'est " + playerTurn[0] + " ("+playerTurn[1]+ ") qui commence.";

    /// Pour afficher les informations générales
    console.log("Joueur 1\nNom : " + playerOne[0] + "\nPattern : " + playerOne[1]+"\n\nJoueur 2\nNom : " + playerTwo[0] + "\nPattern : " + playerTwo[1]+ "\n\nC'est " + playerTurn[0] + " ("+playerTurn[1]+ ") qui commence.");
}





/// Pour changer le joueur qui doit jouer
function changePlayer(){
    if (playerTurn==playerOne){
        playerTurn=playerTwo;
    }
    else{
        playerTurn=playerOne;
    }
}






function play(cell) {
    counter++;
    
    if (cell.innerHTML==playerOne[1] || cell.innerHTML==playerTwo[1]){}

    else{
        /// On met le bon pattern dans la casse sélectionnée
        cell.innerHTML = playerTurn[1];
        cell.style.background = "black";
        cell.style.borderColor = "white";

        /// On regarde s'il y a une victoire
        if (checkGameStatut()==playerOne || checkGameStatut()==playerTwo ) {
            endGameStatus.innerHTML="C'est " + playerTurn[0] + " ("+playerTurn[1]+ ") qui gagne ! Bravo !"
            console.log("C'est " + playerTurn[0] + " ("+playerTurn[1]+ ") qui gagne ! Bravo !");
            endGame();
        }

        /// On regarde s'il y a une égalité
        else if(checkGameStatut()=="Draw") {
            endGameStatus.innerHTML="Egalité ! Personne ne gagne !"
            console.log("Egalité ! Personne ne gagne !")
            endGame();
        }

        /// Sinon on continue de jouer
        else{
            changePlayer();
            gameStatus.innerHTML = "C'est au tour de "+playerTurn[0]+ " ("+playerTurn[1]+ ").";
            console.log("C'est au tour de "+playerTurn[0]);    
        }
    }
}







/// Pour vérifier s'il y a une victoire ou une égalité
function checkGameStatut() {
    var children = document.getElementsByClassName("cell");

    var winningPatterns = [
        children[0].innerHTML + children[1].innerHTML + children[2].innerHTML,
        children[3].innerHTML + children[4].innerHTML + children[5].innerHTML,
        children[6].innerHTML + children[7].innerHTML + children[8].innerHTML,
        children[0].innerHTML + children[3].innerHTML + children[6].innerHTML,
        children[1].innerHTML + children[4].innerHTML + children[7].innerHTML,
        children[2].innerHTML + children[5].innerHTML + children[8].innerHTML,
        children[0].innerHTML + children[4].innerHTML + children[8].innerHTML,
        children[2].innerHTML + children[4].innerHTML + children[6].innerHTML
    ]

    if (winningPatterns.includes(playerOne[1] + playerOne[1] + playerOne[1])) {
        return playerOne;
    }

    else if (winningPatterns.includes(playerTwo[1] + playerTwo[1] + playerTwo[1])) {
        return playerTwo;
    }

    else if(counter==9){
        return "Draw";
    }
}




/// Pour afficher la grille et cacher le formulaire
function startGame() {
    document.getElementById('register').style.display = "none";
    document.getElementsByClassName('board')[0].style.display = "flex";
}

/// Pour afficher la fin et cacher la grille
function endGame() {
    document.getElementsByClassName('board')[0].style.display = "none";
    document.getElementById('gameEnd').style.display = "grid";
}

/// Pour relancer une partie
function reloadGame() {
    window.location.reload();
}