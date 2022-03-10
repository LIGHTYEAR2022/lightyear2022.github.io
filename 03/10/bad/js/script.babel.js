"use strict";

var cardsArray = [
  {
    name: "01",
    img: "img/01.png",
  },
  {
    name: "02",
    img: "img/02.png",
  },
  {
    name: "03",
    img: "img/03.png",
  },
  {
    name: "04",
    img: "img/04.png",
  },
  {
    name: "05",
    img: "img/05.png",
  },
  {
    name: "06",
    img: "img/06.png",
  },
  {
    name: "07",
    img: "img/07.png",
  },
  {
    name: "08",
    img: "img/08.png",
  },
  {
    name: "09",
    img: "img/09.png",
  },
  {
    name: "10",
    img: "img/10.png",
  },
  {
    name: "11",
    img: "img/11.png",
  },
  {
    name: "12",
    img: "img/12.png",
  },
];

// 3-xeso
var gameGrid = cardsArray
  .concat(cardsArray)
  .concat(cardsArray)
  .sort(function () {
    return 0.5 - Math.random();
  });

var firstGuess = "";
var secondGuess = "";
var thirdGuess = "";
var count = 0;
var previousTarget = null;
var delay = 1200;
var guessed = 0;

var game = document.getElementById("game");
var grid = document.createElement("section");
grid.setAttribute("class", "grid");
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
    img = item.img;

  var card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = name;

  var front = document.createElement("div");
  front.classList.add("front");

  var back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = "url(" + img + ")";

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.add("match");
    guessed++;
  });

  if (guessed === cardsArray.length * 3) {
    setTimeout(victory, delay);
  }
};

var victory = function victory() {
    var loc = "";
    loc += (guessed + 65536 >> 8).toString();
    var loc2 = CryptoJS.SHA256(loc).toString() + ".html";
    window.location = loc2;
};

var resetGuesses = function resetGuesses() {
  firstGuess = "";
  secondGuess = "";
  thirdGuess = "";
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.remove("selected");
  });
};

grid.addEventListener("click", function (event) {
  var clicked = event.target;

  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("match")
  ) {
    return;
  }

  if (count < 3) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else if (count === 2) {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      thirdGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }

    if (firstGuess && secondGuess && thirdGuess) {
      if (firstGuess === secondGuess && thirdGuess === secondGuess) {
        setTimeout(match, delay);
      }

      setTimeout(resetGuesses, delay);
    }

    previousTarget = clicked;
  }
});
