names = (function () {
  const form = document.querySelector("#namesForm");
  const startButton = document.querySelector(".startButton");
  const registerPage = document.querySelector(".register");
  const containerPage = document.querySelector(".container");
  const paragraph = document.querySelector(".turn");
  let xName = "";
  let oName = "";

  // Get user input for names
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents form from submitting

    xName = document.querySelector("#xName").value;
    oName = document.querySelector("#oName").value;

    // If user input is null
    if (xName === "") {
      xName = "X";
    }

    // If user input is null
    if (oName === "") {
      oName = "O";
    }

    // Show starting player's turn
    paragraph.textContent = xName !== "" ? xName + "'s turn" : "X's turn";
  });
  startButton.addEventListener("click", () => {
    registerPage.style.display = "none";
    containerPage.style.display = "flex";
    paragraph.style.display = "flex";
  });

  const getX = () => {
    return xName;
  };
  const getO = () => {
    return oName;
  };

  return {
    xName: getX,
    oName: getO,
  };
})();

let game = (function () {
  // Private func/vars
  let gameArray = [];
  let gameEnd = false;
  let possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let row = 0;

  const checkWin = (array) => {
    // Check if X won
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 3; j++) {
        if (array[possibleWins[i][j]] == "X") {
          row++;
        }

        // If there's a row of 3 x's then show winner
        if (row === 3) {
          document.querySelector(".turn").textContent =
            names.xName() + " is the winner!";
          gameEnd = true;
          row = 0;
          return;
        }
      }
      row = 0;
    }
    // Check if O won
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 3; j++) {
        if (array[possibleWins[i][j]] == "O") {
          row++;
        }

        // If there's a row of 3 x's then show winner
        if (row === 3) {
          document.querySelector(".turn").textContent =
            names.oName() + " is the winner!";
          gameEnd = true;
          row = 0;
          return;
        }
      }
      row = 0;
    }
  };

  const getGameEnd = () => gameEnd;

  const getRow = () => row;

  const toggleEndVar = () => (gameEnd = false);

  const clearGameArray = () => (game.array = []);

  // Return public func/vars
  return {
    array: gameArray,
    checkWinner: checkWin,
    end: getGameEnd,
    toggleEnd: toggleEndVar,
    getRow: getRow,
    clearArray: clearGameArray,
  };
})();

let player = (function () {
  // Private func/vars
  let playerSymbol = "X";

  // Update symbol on request
  let getPlayerSymbol = () => playerSymbol;

  // Switch paragraph text to indicate player's turn on screen
  let toggleTurn = () => {
    turn.textContent === names.xName() + "'s turn"
      ? (turn.textContent = names.oName() + "'s turn")
      : (turn.textContent = names.xName() + "'s turn");

    playerSymbol === "X" ? (playerSymbol = "O") : (playerSymbol = "X");
  };

  // Restart entire grid and reset player symbol
  restartButton = document.querySelector(".restart>button");
  restartButton.addEventListener("click", () => {
    for (let i = 0; i < grid.spaces.length; i++) {
      // Clear grids
      grid.spaces[i].textContent = "";
    }
    // Reset turn
    turn.textContent = names.xName() + "'s turn";

    // Reset game.end variable
    game.toggleEnd();

    // Reset game array
    game.clearArray();

    // Reset player Symbol
    playerSymbol = "X";
  });

  const turn = document.querySelector(".turn");
  turn.textContent = names.xName() + "'s turn";

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
      // Check if grid is empty and there isn't a winner before filling it
      if (gridSpaces[i].textContent === "" && game.end() === false) {
        // Insert player's symbol into grid
        gridSpaces[i].textContent = player.symbol();

        // Insert symbol into array at grid's index
        game.array[gridSpaces[i].id] = player.symbol();

        // Toggle turn
        player.toggleTurn();

        // Check if there's a winner
        game.checkWinner(game.array);
      }
    });
  }

  // Return public func/vars
  return {
    spaces: gridSpaces,
  };
})();
