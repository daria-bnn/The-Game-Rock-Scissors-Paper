function fetchRequest(url, cb) {
  return fetch(url)
    .then((result) => result.json())
    .then((data) => cb(data))
    .catch(() => window.application.renderScreen("screen-error-request"));
}
