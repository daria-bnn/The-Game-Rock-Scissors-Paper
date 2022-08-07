//---------для блокировки кнопки после нажатия--------

function disabledButton(btn) {
    btn.disabled = 'disabled';
    btn.classList.add('app__button_disabled');
}

//---------валидация инпута с лог-----------

function showErrorMessage(input, text) {
    const block = input.closest('form');
    const errorMessage = block.querySelector('.block-form__error');

    errorMessage.classList.remove('block-form__error-hidden');

    errorMessage.textContent = text;
}

function hiddenErrorMessage(block) {
    block.classList.add('block-form__error-hidden');
}


function validateInput(input) {
    let error;
    const letters = /^[a-zA-Z]*$/;

    error = Object.keys(ValidityState.prototype).find(key => {
        if (key === 'valid') return;

        return input.validity[key];
    })

    if (!letters.test(input.value[0])) {
        error = 'errorFirstLetter';
    }

    showErrorMessage(input, window.application.errorForInput[error]);
}
