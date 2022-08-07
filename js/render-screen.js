//-------------for screens------------
window.application.screens['screen-reg'] = renderGreetingScreen;
window.application.screens['screen-lobby'] = renderLobbyScreen;
window.application.screens['screen-block-wait'] = renderBlockWaiting;
window.application.screens['screen-block-move'] = renderBlockMove;
window.application.screens['screen-waiting-move-user'] = renderWaitingMoves;
window.application.screens['screen-same-moves'] = renderScreenSameMoves;
window.application.screens['screen-win'] = renderScreenWin;
window.application.screens['screen-lose'] = renderScreenLose;
window.application.screens['screen-error'] = renderScreenError;
window.application.screens['screen-error-request'] = renderScreenErrorRequest;

//reg

function renderGreetingScreen() {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    const title = document.createElement('h1');
    title.classList.add('app__title', 'block-reg__title');
    title.textContent = 'Добро пожаловать в игру \“Камень-ножницы-бумага\”';

    const blockImage = document.createElement('div');
    blockImage.classList.add('app__block-img', 'block-reg__block-img');

    const image = document.createElement('img');
    image.src = 'image/cat-geg.png';
    image.alt = 'Кот с клубком';

    app.appendChild(title);
    blockImage.appendChild(image);
    app.appendChild(blockImage);

    window.application.renderBlock('example-form-reg', app);
}

//lobby

function renderLobbyScreen() {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    const title = document.createElement('h2');
    title.classList.add('app__title');
    title.textContent = 'Вы перешли в \“Лобби\”';

    const text = document.createElement('p');
    text.classList.add('app__subtitle');
    text.textContent = 'Здесь вы можете видеть список игроков';

    const blockList = document.createElement('div');
    blockList.classList.add('app__block-list');

    app.appendChild(title);

    const block = document.createElement('div');
    block.classList.add('app__main', 'block-info');


    const headerBlock = document.createElement('div');
    headerBlock.classList.add('block-info__header', 'block-info__main-info');

    const nameHeader = document.createElement('div');
    nameHeader.classList.add('block-info__header-name');
    nameHeader.textContent = 'Имя';

    const winsHeader = document.createElement('div');
    winsHeader.classList.add('block-info__header-wins');

    headerBlock.appendChild(nameHeader);
    headerBlock.appendChild(winsHeader);

    block.appendChild(headerBlock);

    const blockUsers = document.createElement('div');
    blockUsers.classList.add('block-info__users');

    block.appendChild(blockUsers);

    if (window.application.timers.length === 0) {
        window.application.renderBlock('play-list', blockUsers);

        const timerForListUsers = setInterval(() => {
            window.application.renderBlock('play-list', blockUsers);
        }, 2000);

        window.application.timers.push(timerForListUsers);
    }

    app.appendChild(text);
    app.appendChild(block);
    window.application.renderBlock('button-play', app);
}

//wait

function renderBlockWaiting() {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    const title = document.createElement('h2');
    title.classList.add('app__title', 'block-wait__title');
    title.textContent = 'Игра скоро начнется';

    const blockImage = document.createElement('div');
    blockImage.classList.add('app__block-img', 'block-reg__block-img');

    const image = document.createElement('img');
    image.src = 'image/cat-wait.png';
    image.alt = 'Кот с клубком';

    blockImage.appendChild(image);

    const text = document.createElement('p');
    text.classList.add('app__subtitle', 'block-wait__subtitle');
    text.textContent = 'Ожидаем подключение соперника...';

    app.appendChild(title);
    app.appendChild(blockImage);
    app.appendChild(text);

    window.application.renderBlock('block-wait', app);
}
//moves

function renderBlockMove() {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    const title = document.createElement('h2');
    title.classList.add('app__title');
    title.textContent = 'Ваш ход';

    const text = document.createElement('p');
    text.classList.add('app__subtitle', 'app__subtitle_block-moves');
    text.textContent = `Вы играете против ${window.application.enemyLogin}`

    app.appendChild(title);
    app.appendChild(text);

    window.application.renderBlock('button-moves', app);
}

//экран ожидания хода другого игрока

function renderWaitingMoves() {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    const title = document.createElement('h2');
    title.classList.add('app__title');
    title.textContent = 'Ожидаем ход соперника';

    const blockImage = document.createElement('div');
    blockImage.classList.add('app__block-img', 'block-wait__block-img');

    const image = document.createElement('img');
    image.src = 'image/cat-wait2.png';
    image.alt = 'Кот';

    blockImage.appendChild(image);

    app.appendChild(title);
    app.appendChild(blockImage);

    window.application.renderBlock('request-moves-user', app);
}

function renderScreenSameMoves() {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    const title = document.createElement('h2');
    title.classList.add('app__title');
    title.textContent = 'Упс...ничья';

    const text = document.createElement('p');
    text.classList.add('app__subtitle');
    text.textContent = 'Сделайте еще один ход';

    app.appendChild(title);
    app.appendChild(text);

    window.application.renderBlock('button-moves', app);
}

function renderScreenWin() {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    const title = document.createElement('h2');
    title.classList.add('app__title');
    title.textContent = 'Вы выиграли';

    const blockImage = document.createElement('div');
    blockImage.classList.add('app__block-img');

    const image = document.createElement('img');
    image.src = 'image/cat-win.png';
    image.alt = 'Кот';

    blockImage.appendChild(image);

    const blockForButtons = document.createElement('div');
    blockForButtons.classList.add('app__block-buttons');

    window.application.renderBlock('button-play', blockForButtons);
    window.application.renderBlock('button-lobby', blockForButtons);

    app.appendChild(title);
    app.appendChild(blockImage);
    app.appendChild(blockForButtons);
}

function renderScreenLose() {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    const title = document.createElement('h2');
    title.classList.add('app__title');
    title.textContent = 'Вы проиграли';

    const blockImage = document.createElement('div');
    blockImage.classList.add('app__block-img');

    const image = document.createElement('img');
    image.src = 'image/cat-lose.png';
    image.alt = 'Кот';

    blockImage.appendChild(image);

    const blockForButtons = document.createElement('div');
    blockForButtons.classList.add('app__block-buttons');

    window.application.renderBlock('button-play', blockForButtons);
    window.application.renderBlock('button-lobby', blockForButtons);

    app.appendChild(title);
    app.appendChild(blockImage);
    app.appendChild(blockForButtons);
}

//отрисовка с сообщением 
function renderScreenError() {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    const title = document.createElement('h2');
    title.classList.add('app__title');
    title.textContent = 'Произошла ошибка';

    const text = document.createElement('p');
    text.classList.add('app__subtitle', 'app__text-error');
    text.textContent = `${window.application.errorsForPage[window.application.error]}`;

    const blockImage = document.createElement('div');
    blockImage.classList.add('app__block-img');

    const image = document.createElement('img');
    image.src = 'image/cat-error.png';
    image.alt = 'Кот';

    blockImage.appendChild(image);

    app.appendChild(title);
    app.appendChild(text);
    app.appendChild(blockImage);

    window.application.renderBlock('button-reset', app);
}

function renderScreenErrorRequest() {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    const title = document.createElement('h2');
    title.classList.add('app__title');
    title.textContent = 'Что-то сломалось. Попробуйте зайти позже';

    const blockImage = document.createElement('div');
    blockImage.classList.add('app__block-img');

    const image = document.createElement('img');
    image.src = 'image/cat-error.png';
    image.alt = 'Кот';

    blockImage.appendChild(image)

    app.appendChild(title);
    app.appendChild(blockImage);
}