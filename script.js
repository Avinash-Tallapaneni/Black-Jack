let dealerSum = 0;
let playerSum = 0;
let playerAce = 0;
let dealerAce = 0;
let canHit = true;
var deck;

window.onload = function() {
    createDeck();
    shuffleDeck();
    startGame();
}

const displayMessage = {
    0 : "You lose!, Try again", //dealer sum is greater than player
    1 : "congradualation, You Win!", // player sum is greater than dealer
    2 : "ahhh, Its a Tie", //if both have same value
}


const stayEl = document.getElementById("stay");
const hitEl = document.getElementById("hit");

//Card values and types
let card_values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let card_types = ["C", "H", "D", "S"];
// console.log(card_types);
// console.log(card_values);


// Deck creation
const createDeck = () => {
    deck =[];
    for(let i = 0 ; i < card_values.length; i++) {
        for (let j = 0; j < card_types.length; j++) {
            deck.push(card_values[i] + "-" + card_types[j]);
        }
    }
//  console.log(deck);
    return deck;
}

// shuffle deck
const shuffleDeck = () => {
    for (i = 0; i < deck.length; i++) {
        let randomNumber = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[randomNumber];
        deck[randomNumber] = temp;
    }
    //  console.log(deck);
}

// startgame
// player  gets first card, then dealer then player and then dealer

const startGame = () => {

    for(let i = 0; i < 2 ; i++) {

        let dealercardImg = document.createElement("img");
        let dealerOpeningCards = deck.pop(); // return string
        console.log(dealerOpeningCards, 'dealer opening card')
        dealercardImg.src = "./Black_jack_cards/" + dealerOpeningCards+".png";
        document.getElementById("dealerOpeningCardsImg").append(dealercardImg);
        document.getElementById("dealerOpeningCardsImg").style.display = 'none';


        dealerSum += openingCards(dealerOpeningCards,"dealer");



        let playerCardImg = document.createElement("img");
        let playerOpeningCards = deck.pop(); // return string
        playerCardImg.src = "./Black_jack_cards/" + playerOpeningCards + ".png";
        document.getElementById("playerOpeningCardsImg").append(playerCardImg);


        playerSum += openingCards(playerOpeningCards);


        // console.log(playerCardImg.src);

    }
        console.log("dealerSum :" + dealerSum);
        console.log("playerSum :" + playerSum);
        while(dealerSum < 17) {

            let dealercardImg = document.createElement("img");
            let dealerOpeningCards = deck.pop(); // return string
            dealercardImg.src = "./Black_jack_cards/" + dealerOpeningCards+".png";
            document.getElementById("dealerOpeningCardsImg").append(dealercardImg);
            dealerSum += openingCards(dealerOpeningCards,"dealer");
            console.log("dealerSum :" + dealerSum);
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}




//returns cardsvalues for playersum
const openingCards = (el,person = "player") => {
    let cardSplit = el.split("-"); // returns string in an array. ["A", "7"]
    let cardNumberDigit = (cardSplit[0]); // return only first value of an array
    // console.log(cardNumberDigit);

    if(isNaN(cardNumberDigit)) { //assign value of 10 to face cards
        if(cardNumberDigit === "A") {
            cardNumberDigit = 11; // Ace value is assigned 11
            person === 'dealer' ? ++dealerAce : ++playerAce;
        } else cardNumberDigit = 10;
    }
    // console.log(parseInt(cardNumberDigit));
    return cardNumber = parseInt(cardNumberDigit);
    // console.log(typeof cardNumber);


}

// player Hit or stay

const hit = () => {
    console.log(playerSum, 'in hit playersum')
    if(dealerSum > 22) {
        aceChange();
        // if(dealerSum > 22) {
        // message = displayMessage[1];
        // document.querySelectorAll(".result")[0].textContent= message;


        // }
    }

    if(!canHit) {
        return
    }

    let playerCardImg = document.createElement("img");
    let value = deck.pop();
    playerCardImg.src = "./Black_jack_cards/" + value + ".png";
    document.getElementById("playerOpeningCardsImg").append(playerCardImg);
    playerSum += openingCards(value);
    console.log("playerSum :" + playerSum);
    // console.log("playerAce :" + playerAce);


  if(playerSum >= 22) {
        aceChange();
  }

  if (playerSum >= 22){
    if(playerSum == 21){

        message = displayMessage[1];
        canHit = false;
        document.querySelectorAll(".dealer-header")[0].textContent = dealerSum;
        document.querySelectorAll(".player-header")[0].textContent= playerSum;
        document.querySelectorAll(".result")[0].textContent= message;

        document.getElementById("dealerOpeningCardsImg").style.display = "";
        document.getElementById("dealerHiddenCard").style.display = "none";

        stayEl.textContent = "New Game";
        hitEl.style.display = "none";
        stayEl.addEventListener("click", restart);
    }
    message = displayMessage[0];
    canHit = false;
        document.querySelectorAll(".dealer-header")[0].textContent = dealerSum;
        document.querySelectorAll(".player-header")[0].textContent= playerSum;
        document.querySelectorAll(".result")[0].textContent= message;

        document.getElementById("dealerOpeningCardsImg").style.display = "";
        document.getElementById("dealerHiddenCard").style.display = "none";

        stayEl.textContent = "New Game";
        hitEl.style.display = "none";
        stayEl.addEventListener("click", restart);

    }

}





const stay = () => {
    canHit = false;

    if(dealerSum > 22) {
        aceChange();
    }

    if(playerSum == dealerSum || (playerSum > 21 && dealerSum > 21)) {
        message = displayMessage[2];
    } else if (playerSum <= 21 && (playerSum > dealerSum || dealerSum >21)) {
        message = displayMessage[1];

    } else  {
        message = displayMessage[0];

    }
    document.querySelectorAll(".dealer-header")[0].textContent = dealerSum;
    document.querySelectorAll(".player-header")[0].textContent= playerSum;
    document.querySelectorAll(".result")[0].textContent= message;


    document.getElementById("dealerOpeningCardsImg").style.display = "";
    document.getElementById("dealerHiddenCard").style.display = "none";

    stayEl.textContent = "New Game";
    hitEl.style.display = "none";
    stayEl.addEventListener("click", restart);
    // document.getElementById("dealerOpeningCardsImg").style.display = "";
    // document.getElementById("dealerHiddenCard").style.display = "none ";

}


const aceChange = () => {
    if(playerSum > 22) {
     while(playerAce >= 1 && playerSum > 22 ) {
     playerSum -= 10;
     playerAce -= 1;
    }

    if (dealerSum > 22)
        while(dealerAce >= 1 && dealerSum > 22 ) {
        dealerSum -= 10;
        dealerAce -= 1;
    }
    }
    return;

}


const restart = () => {


    document.getElementById("dealerOpeningCardsImg").innerHTML ="";
    document.getElementById("playerOpeningCardsImg").innerHTML ="";
    document.getElementById("dealerHiddenCard").style.display = "";
    document.querySelectorAll(".dealer-header")[0].innerText = "Dealer"
    document.querySelectorAll(".player-header")[0].innerText = "player"
    document.querySelectorAll(".result")[0].innerText = "";
    hitEl.style.display = "";



    dealerSum = 0;
    playerSum = 0;
    playerAce = 0;
    dealerAce = 0;
    canHit = true;

    stayEl.textContent = "Stay"
    //  hitEl.textContent = "hit"

    stayEl.removeEventListener ("click", restart);
    hitEl.removeEventListener ("click", restart);
    startGame();
    createDeck();
    shuffleDeck();

}