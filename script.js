let game = (function () {
  // Private func/vars
  let gameArray = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
  let _childDivs = document.querySelector(".box").getElementsByTagName("div");

  function populateGame() {
    for (let i = 0; i < 9; i++) {
      _childDivs[i].textContent = gameArray[i];
    }
  }

  // Return public func/vars
  return {
    array: gameArray,
    populate: () => {
      populateGame();
    },
  };
})();

let player = (function () {
  // Private func/vars
  let _symbolButtons = Array.from(
    document.querySelectorAll(".selector>button")
  );
  let playerSymbol = "";

  for (let i = 0; i < _symbolButtons.length; i++) {
    _symbolButtons[i].addEventListener("click", () => {
      playerSymbol = _symbolButtons[i].textContent;
      console.log(playerSymbol + " CHOSEN");
    });
  }

  let getPlayerSymbol = () => playerSymbol;

  // Return public func/vars
  return {
    symbol: getPlayerSymbol,
  };
})();

let click = (function () {
  // Private func/vars
  gridSpaces = Array.from(document.querySelectorAll(".box>div"));

  for (let i = 0; i < gridSpaces.length; i++) {
    gridSpaces[i].addEventListener("click", () => {
      if (gridSpaces[i].textContent === "") {
        gridSpaces[i].textContent = player.symbol();
        console.log(gridSpaces[i].textContent);
      }
    });
  }

  // Return public func/vars
  return {
    log: () => {
      console.log(gridSpaces);
    },
  };
})();
