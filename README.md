# Project Movies Explorer Api

## О API
Diploma backend yandex

## Запуск проекта

- `npm run start` — запускает сервер
- `npm run dev` — запускает сервер с hot-reload
- `npm run lint` — запуск EsLint

## Краткое описание
### Функционал API

- Добавление, удаление, получение списка фильмов
- Регистрация, авторизация (через Cookie)
- Редактирование, получение информации профиля
- Выход из системы, проверка авторизации для фронтенда

### Роуты


- /users/me (GET, PATCH)
- /movies (GET, POST)
- /check-auth (GET)
- /signup (POST)
- /signin (POST)
- /movies/movieId (DELETE)
- /signout (DELETE)


### Деплой

- Использован сервер на Yandex Cloud
- Запущена виртуальная машина на Ubuntu
- Зарегистрирован домен для API
- Выпущен и подключён https сертификат
