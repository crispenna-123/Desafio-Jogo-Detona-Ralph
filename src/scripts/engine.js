const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: null,
    result: 0,
    currentTime: 60,
    lives: 3,
  },
  actions: {
    timerId: null,
    countDownTimerId: null,
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  if (state.values.currentTime <= 0 || state.values.lives <= 0) {
    endGame();
  }
}

function endGame() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);
  alert(`Seu resultado foi: ${state.values.result}`);
  location.reload();
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * state.view.squares.length);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function loseLife() {
  state.values.lives--;
  state.view.lives.textContent = state.values.lives;
  if (state.values.lives <= 0) {
    endGame();
  }
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("enemy")) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        loseLife();
      }
    });
  });
}

function initialize() {
  state.view.timeLeft.textContent = state.values.currentTime;
  state.view.lives.textContent = state.values.lives;
  state.view.score.textContent = state.values.result;
  addListenerHitBox();
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

initialize();
