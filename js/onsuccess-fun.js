//страница регистрации
function getStatusGame(data) {
  window.application.token = data.token;

  const input = document.querySelector(".block-form__login");
  window.application.login = input.value;

  fetchRequest(
    `${baseUrl}/player-status?token=${window.application.token}`,
    renderLobby
  );
}

//для лобби
function renderLobby(infoUser) {
  const button = document.querySelector(".block-form__button");

  button.removeAttribute("disabled");
  button.classList.remove("app__button_disabled");

  if (infoUser["player-status"].status === "lobby") {
    window.application.renderScreen("screen-lobby");
  }

  if (infoUser["player-status"].status === "game") {
    window.application.idGame = infoUser["player-status"].game.id;
    window.application.renderScreen("screen-block-wait");
  }
}

//для ожидания игрока

function showStatusGame(data) {
  if (data.status === "error") {
    window.application.error = data.message;

    window.application.renderScreen("screen-error");

    return;
  }

  if (data["game-status"].status === "waiting-for-enemy-move") {
    window.application.renderScreen("screen-waiting-move-user");

    return;
  }

  if (data["game-status"].status !== "waiting-for-start") {
    window.application.enemyLogin = data["game-status"].enemy.login;

    window.application.renderScreen("screen-block-move");
  }
}

//функции для показа статуса игры
function showResultGameForButton(data) {
  if (data.status === "error") {
    window.application.error = data.message;

    window.application.renderScreen("screen-error");
  }

  if (data["game-status"].status === "waiting-for-enemy-move") {
    window.application.renderScreen("screen-waiting-move-user");
  }

  chekStatus(data);
}

function showResultGame(data) {
  if (data.status === "error") {
    window.application.error = data.message;

    window.application.renderScreen("screen-error");

    return;
  }

  chekStatus(data);
}

function chekStatus(data) {
  if (data["game-status"].status === "lose") {
    window.application.renderScreen("screen-lose");
  }

  if (data["game-status"].status === "win") {
    window.application.renderScreen("screen-win");
  }

  if (data["game-status"].status === "waiting-for-your-move") {
    window.application.renderScreen("screen-same-moves");
  }
}
