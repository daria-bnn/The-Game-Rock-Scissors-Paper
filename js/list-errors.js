//объект для валидации инпута 
window.application.errorForInput = {
    valueMissing: 'Необходимо ввести логин',
    patternMismatch: 'Используйте только латинские буквы, специальные символы или цифры',
    tooShort: 'Логин должен содержать не менее 3 символов',
    errorFirstLetter: 'Логин может начинаться только с латинской буквы'
}

//список ошибок 
window.application.errorsForPage = {
    'token doesn\'t exist': 'Необходимо перезайти в игру',
    'player is already in game': 'Игрок уже в игре',
    'no game id': 'Id игры некорректный',
    'wrong game id': 'Игра окончена',
    'player is not in this game': 'Игрок находится не в этой игре',

}