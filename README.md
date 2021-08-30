## Description

Тестовое задание для бэкенд разработки.
После того как сервер будет запущен. Для просмотра документации по Api сервера, переходите по ссылке (http://localhost:3000/api/), там же можно будет и проверить работу с api.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

```bash
# Сборка образа
$ docker-compose build

# Создайте ".env" файл в корне проекта. И заполните в нём следующие переменные:
PORT = 3000
POSTGRES_HOST = postgres
POSTGRES_USER = test
POSTGRES_DB = test
POSTGRES_PASSWORD = test
POSTGRES_PORT = 5432

# Запуск контейнера
$ docker-compose up
```

## License

Nest is [MIT licensed](LICENSE).
