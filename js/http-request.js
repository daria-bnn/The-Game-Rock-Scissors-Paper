const noop = () => { };

function httpRequest({
    method = 'GET',
    headers,
    url,
    body,
    type = 'json',
    onSuccess = noop,
    onError = function () {
        window.application.renderScreen('screen-error-request')
    },
}) {
    const request = new XMLHttpRequest();

    request.open(method, url);
    request.responseType = type;

    if (headers) {
        Object.keys(headers).forEach(headerName => {
            request.setRequestHeader(headerName, headers[headerName]);
        });
    }

    request.send(body);

    request.onload = function () {
        if (request.status === 200) {
            onSuccess(request.response);
        } else {
            onError('Не удалось отправить запрос');
        }
    };

    request.onerror = function () {
        onError('Отсутсвует интернет');
    }
}