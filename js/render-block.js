//-------------for blocks------------
window.application.blocks["example-form-reg"] = renderForm;
window.application.blocks["play-list"] = renderPlayList;
window.application.blocks["button-play"] = renderButtonForPlay;
window.application.blocks["block-wait"] = renderWaitingBlock;
window.application.blocks["button-moves"] = renderBottonsMoves;
window.application.blocks["request-moves-user"] = requestMoveUser;
window.application.blocks["button-lobby"] = renderButtonForLobby;
window.application.blocks["button-reset"] = buttonForFirstPahe;

//reg
function renderForm(container) {
  const form = document.createElement("form");
  form.classList.add("app__block-form", "block-form");
  form.setAttribute("novalidate", "");

  const label = document.createElement("label");
  label.classList.add("block-form__label");
  label.for = "login";
  label.textContent = "Пройдите короткую регистрацию";

  const input = document.createElement("input");
  input.classList.add("block-form__login");
  input.classList.id = "login";
  input.placeholder = "Введите логин";
  input.required = "required";
  input.setAttribute("minlength", "3");
  input.pattern = "^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$";

  const button = document.createElement("button");
  button.classList.add("block-form__button", "app__button");
  button.textContent = "Войти";

  const errorMessage = document.createElement("div");
  errorMessage.classList.add("block-form__error", "block-form__error-hidden");

  input.addEventListener("input", () => {
    hiddenErrorMessage(errorMessage);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!input.validity.valid) {
      validateInput(input);

      return;
    }

    disabledButton(button); //блокировка кнопки при загрузке

    fetchRequest(`${baseUrl}/login?login=${input.value}`, getStatusGame);
  });

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(button);
  form.appendChild(errorMessage);

  container.appendChild(form);
}

//lobby-list

function renderPlayList(container) {
  fetchRequest(
    `${baseUrl}/player-list?token=${window.application.token}`,
    function (data) {
      console.log(data);
      container.innerHTML = "";

      if (data.list.length === 0) {
        window.application.error = "token doesn't exist";

        window.application.renderScreen("screen-error");

        return;
      }

      data.list.forEach((name) => {
        const userInfo = document.createElement("div");
        userInfo.classList.add("block-info__main-info");

        const nameUser = document.createElement("p");
        nameUser.classList.add("block-info__user-name");

        if (window.application.login === name.login) {
          nameUser.textContent = `${name.login} (это вы)`;
        } else {
          nameUser.textContent = name.login;
        }

        const winsUser = document.createElement("p");
        winsUser.classList.add("block-info__user-wins");
        winsUser.textContent = name.wins;

        userInfo.appendChild(nameUser);
        userInfo.appendChild(winsUser);

        container.appendChild(userInfo);
      });
    }
  );
}

//lobby-button-play

function renderButtonForPlay(container) {
  const button = document.createElement("button");
  button.classList.add("app__button");
  button.textContent = "Играть";

  button.addEventListener("click", () => {
    disabledButton(button);

    fetchRequest(
      `${baseUrl}/start?token=${window.application.token}`,
      function (data) {
        console.log(data);
        if (data.status === "error") {
          window.application.error = data.message;

          window.application.renderScreen("screen-error");

          return;
        }

        window.application.idGame = data["player-status"].game.id;

        window.application.renderScreen("screen-block-wait");
      }
    );
  });

  container.appendChild(button);
}

//waiting block - ожидание подключения другого игрока
function renderWaitingBlock(container) {
  if (window.application.timers.length === 0) {
    const timerForStatusGame = setInterval(() => {
      fetchRequest(
        `${baseUrl}/game-status?token=${window.application.token}&id=${window.application.idGame}`,
        showStatusGame
      );
    }, 500);

    window.application.timers.push(timerForStatusGame);
  }
}

//button-moves - отрисовка блока с кнопками

function renderBottonsMoves(container) {
  const blockMoves = document.createElement("div");
  blockMoves.classList.add("block-moves");

  const buttonPaper = document.createElement("button");
  buttonPaper.classList.add(
    "app__button",
    "block-moves__button",
    "block-moves__button_papper"
  );
  buttonPaper.dataset.dataMove = "paper";
  buttonPaper.textContent = "Бумага";

  const buttonScissors = document.createElement("button");
  buttonScissors.classList.add(
    "app__button",
    "block-moves__button",
    "block-moves__button_scis"
  );
  buttonScissors.dataset.dataMove = "scissors";
  buttonScissors.textContent = "Ножницы";

  const buttonRock = document.createElement("button");
  buttonRock.classList.add(
    "app__button",
    "block-moves__button",
    "block-moves__button_rock"
  );
  buttonRock.dataset.dataMove = "rock";
  buttonRock.textContent = "Камень";

  blockMoves.appendChild(buttonPaper);
  blockMoves.appendChild(buttonScissors);
  blockMoves.appendChild(buttonRock);

  blockMoves.addEventListener("click", function (event) {
    const target = event.target;

    if (target.tagName !== "BUTTON") {
      return;
    }

    fetchRequest(
      `${baseUrl}/play?token=${window.application.token}&id=${window.application.idGame}&move=${target.dataset.dataMove}`,
      showResultGameForButton
    );
  });

  container.appendChild(blockMoves);
}

//ожидание хода другого игрока

function requestMoveUser(container) {
  if (window.application.timers.length === 0) {
    const timerForStatusGame = setInterval(() => {
      fetchRequest(
        `${baseUrl}/game-status?token=${window.application.token}&id=${window.application.idGame}`,
        showResultGame
      );
    }, 500);

    window.application.timers.push(timerForStatusGame);
  }
}

//кнопка для лобби

function renderButtonForLobby(container) {
  const button = document.createElement("button");
  button.classList.add("app__button");
  button.textContent = "В Лобби";

  button.addEventListener("click", function () {
    window.application.renderScreen("screen-lobby");
  });

  container.appendChild(button);
}

//кнопка перехода на стартовую страницу

function buttonForFirstPahe(container) {
  const button = document.createElement("button");
  button.classList.add("app__button", "app__button_reset");
  button.textContent = "Начать заново";

  button.addEventListener("click", function () {
    window.application.renderScreen("screen-reg");
  });

  container.appendChild(button);
}
