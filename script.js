let dealerSum = 0;
let playerSum = 0;
let playerAce = 0;
let dealerAce = 0;

var deck;


window.onload = function() {
    createDeck();
    shuffleDeck();
    startGame();
}



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
            deck.push(card_values[i] + " - " + card_types[j]);
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
        let dealerOpeningCards = deck.shift(); // return string
        dealercardImg.src = "./Black jack cards/" + dealerOpeningCards+".png";
        document.getElementById("dealerOpeningCardsImg").append(dealercardImg);

        dealerSum += openingCards(dealerOpeningCards);
        console.log("dealerSum :" + dealerSum);


        let playerCardImg = document.createElement("img");
        let playerOpeningCards = deck.shift(); // return string
        playerCardImg.src = "./Black jack cards/" + playerOpeningCards + ".png";
        document.getElementById("playerOpeningCardsImg").append(playerCardImg);

        playerSum += openingCards(playerOpeningCards);
        console.log("playerSum :" + playerSum);

        // console.log(playerCardImg.src);

    }
        while(dealerSum < 17) {

            let dealercardImg = document.createElement("img");
            let dealerOpeningCards = deck.shift(); // return string
            dealercardImg.src = "./Black jack cards/" + dealerOpeningCards+".png";
            document.getElementById("dealerOpeningCardsImg").append(dealercardImg);
            dealerSum += openingCards(dealerOpeningCards);
            console.log("dealerSum :" + dealerSum);
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

//returns cardsvalues for playersum
const openingCards = (el) => {
    let cardSplit = el.split(" - "); // returns string in an array. ["A", "7"]
    let cardNumberDigit = (cardSplit[0]); // return only first value of an array
    // console.log(cardNumberDigit);

    if(isNaN(cardNumberDigit)) { //assign value of 10 to face cards
        if(cardNumberDigit === "A") {
            cardNumberDigit = 11; // Ace value is assigned 11
            playerAce += 1;
        } else cardNumberDigit = 10;
    }
    // console.log(parseInt(cardNumberDigit));
    return cardNumber = parseInt(cardNumberDigit);
    // console.log(typeof cardNumber);


}

// player Hit or stay

const hit = () => {

    let playerCardImg = document.createElement("img");
    let value = deck.shift();
    playerCardImg.src = "./Black jack cards/" + value + ".png";
    document.getElementById("playerOpeningCardsImg").append(playerCardImg);
    playerSum += openingCards(value);
    console.log("playerSum :" + playerSum);

    // console.log(playerAce);
    if(playerSum > 22 || dealerSum >22) {
        aceChange();
    }
    console.log("playerSum ace:" + playerSum);
    console.log("playerAce :" + playerAce);

}


const stay = () => {
    let dealerHitCard = deck.shift()
    playerSum += openingCards(dealerHitCard);
    console.log("playerSum :" + dealerSum);
    // console.log(playerAce);
    if(dealerSum > 22) {
        aceChange();
    }
    console.log("playerSum ace:" + playerSum);
    console.log("playerAce :" + playerAce);

}

const aceChange = () => {
    if(playerSum > 22) {
     while(playerAce >= 1 && playerSum > 21 ) {
     playerSum -= 10;
     playerAce -= 1;
    }
    } else {
        while(dealerAce >= 1 && dealerSum > 21 ) {
        dealerSum -= 10;
        dealerAce -= 1;
    }
    }
    return;

}










