const BASE_URL = "https://api.mikhail.yandex.nomoredomains.monster";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status}: ${res.statusText}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

//регистрация пользователя
export function register(email, password) {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

//авторизация пользователя
export function authorize(email, password) {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

//проверка валидности токена
export function checkToken(jwt) {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  });
}
