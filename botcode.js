// initialize deck of cards
const deck = [
    { suit: "hearts", value: 2 },
    { suit: "hearts", value: 3 },
    ...
    { suit: "diamonds", value: 10 },
    { suit: "diamonds", value: "J" },
    { suit: "diamonds", value: "Q" },
    { suit: "diamonds", value: "K" },
    { suit: "diamonds", value: "A" }
  ];

  // shuffle deck
  function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  // deal cards to player and dealer
  function dealCards(deck) {
    return {
      playerCards: [deck.shift(), deck.shift()],
      dealerCards: [deck.shift(), deck.shift()]
    };
  }

  // calculate total value of player's hand
  function calculatePlayerTotal(playerCards) {
    let playerTotal = 0;
    let numAces = 0;
    playerCards.forEach(card => {
      if (card.value === "J" || card.value === "Q" || card.value === "K") {
        playerTotal += 10;
      } else if (card.value === "A") {
        playerTotal += 11;
        numAces++;
      } else {
        playerTotal += card.value;
      }
    });
}
    // handle case where player has multiple





// Get the element where you want to append the HTML code
var container = document.getElementById("container");

// Create a variable to hold the HTML code
var html = "";

// Loop through the images in your folder
for (var i = 0; i < images.length; i++) {
  // Add the HTML code for each image to the variable
  html += "<img src='" + images[i] + "' />";
}

// Use the innerHTML property to add the HTML code to the container element
container.innerHTML = html;
