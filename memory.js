let cards = document.querySelectorAll(".card");
let restartButton = document.getElementById("restart");
let board = document.getElementsByClassName("wrapper");

cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});

let card1, card2, card1im, card2img;
let disableDeck = false;
let matched = 0;

function flipCard({ target: clickedCard }) {
  if (!card1 && !disableDeck) {
    clickedCard.classList.add("flip");
    card1 = clickedCard;
    card1img = clickedCard.querySelector(".back-view img").src;
  } else if (!disableDeck && clickedCard != card1) {
    clickedCard.classList.add("flip");
    disableDeck = true;
    card2 = clickedCard;
    card2img = clickedCard.querySelector(".back-view img").src;
    checkMatch(card1img, card2img);
  }
}

function checkMatch(img1, img2) {
  if (img1 === img2) {
    matched++;
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    setTimeout(() => {
      card1.classList.add("tilt");
      card2.classList.add("tilt");
      card1 = false;
      card2 = false;
      setTimeout(() => {
        disableDeck = false;
      }, 2000);
    }, 500);
    if (matched === cards.length / 2) {
      setTimeout(() => {
        board[0].classList.add("spin");
      }, 500);
      setTimeout(() => {
        restartButton.style.visibility = "visible";
      }, 3000);
    }
  } else {
    setTimeout(() => {
      card1.classList.add("shake");
      card2.classList.add("shake");
    }, 400);
    setTimeout(() => {
      card1.classList.remove("flip", "shake");
      card2.classList.remove("flip", "shake");
      disableDeck = false;
      card1 = false;
      card2 = false;
    }, 1000);
  }
}
function shuffleDeck() {
  restartButton.style.visibility = "hidden";
  let deck = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  deck.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach(function (card, i) {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
    setTimeout(() => {
      card.querySelector(".back-view img").src = `images/img-${deck[i]}.png`;
    }, 1000);
  });
}

shuffleDeck();
