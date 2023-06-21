const player = "O";
const computer = "X";

let board_full = false;
let game = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".game");

const winner_statement = document.getElementById("won");

check_board_complete = () => {
  let flag = true;

  game.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });

  board_full = flag;

};


const check_line = (a, b, c) => {
  return (
    game[a] == game[b] &&
    game[b] == game[c] &&
    (game[a] == player || game[a] == computer)

  );
};

const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 1}`).classList.add("win");
      document.querySelector(`#block_${i + 2}`).classList.add("win");
      return game[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 3}`).classList.add("win");
      document.querySelector(`#block_${i + 6}`).classList.add("win");
      return game[i];
    }
  }
  if (check_line(0, 4, 8)) {
    document.querySelector("#block_0").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_8").classList.add("win");
    return game[0];
  }
  if (check_line(2, 4, 6)) {
    document.querySelector("#block_2").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_6").classList.add("win");
    return game[2];
  }
  return "";
};

const check_for_winner = () => {
  let res = check_match()
  if (res == player) {
    won.innerText = "Winner is player";
    won.classList.add("playerWin");
    board_full = true
  } else if (res == computer) {
    won.innerText = "Winner is computer";
    won.classList.add("computerWin");
    board_full = true
  } else if (board_full) {
    won.innerText = "Draw!";
    won.classList.add("draw");
  }
};


const render_board = () => {
  board_container.innerHTML = ""
  game.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${game[i]}</div>`
    if (e == player || e == computer) {
        
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const game_loop = () => {
  render_board();
  check_board_complete();
  
  check_for_winner();
}

const addPlayerMove = e => {
  if (!board_full && game[e] == "") {
    game[e] = player;
    game_loop();
    addComputerMove();
  }
};

const addComputerMove = () => {
  if (!board_full) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (game[selected] != "");
    game[selected] = computer;
    game_loop();
  }
};

const reset_button = () => {
  game = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  won.classList.remove("playerWin");
  won.classList.remove("computerWin");
  won.classList.remove("draw");
  won.innerText = "";
  render_board();
};


render_board();
