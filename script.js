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
  let playerSymbol = "X";

  // Update symbol on request
  let getPlayerSymbol = () => playerSymbol;

  // Switch paragraph text to indicate player's turn on screen
  let toggleTurn = () => {
    turn.textContent[7] === "1"
      ? (turn.textContent = "Player 2's turn")
      : (turn.textContent = "Player 1's turn");

    playerSymbol === "X" ? (playerSymbol = "O") : (playerSymbol = "X");
  };

  // Restart entire grid and reset player symbol
  restartButton = document.querySelector(".restart>button");
  restartButton.addEventListener("click", () => {
    for (let i = 0; i < grid.spaces.length; i++) {
      grid.spaces[i].textContent = "";
      turn.textContent = "Player 1's turn";
    }
    playerSymbol = "X";
  });

  const turn = document.querySelector(".turn");
  turn.textContent = "Player 1's turn";

  // Return public func/vars
  return {
    symbol: getPlayerSymbol,
    playerSymbol: playerSymbol,
    toggleTurn: toggleTurn,
  };
})();

let grid = (function () {
  // Private func/vars
  gridSpaces = Array.from(document.querySelectorAll(".box>div"));

  for (let i = 0; i < gridSpaces.length; i++) {
    gridSpaces[i].addEventListener("click", () => {
      if (gridSpaces[i].textContent === "" && player.symbol() !== "") {
        gridSpaces[i].textContent = player.symbol();
        player.toggleTurn();
      }
    });
  }

  // Return public func/vars
  return {
    spaces: gridSpaces,
  };
})();
