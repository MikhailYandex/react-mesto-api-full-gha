const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const allowedCors = [
  'http://localhost:3000',
  'http://api.mikhail.yandex.nomoredomains.monster',
  'https://api.mikhail.yandex.nomoredomains.monster',
  'http://mikhail.yandex.nomoredomains.monster',
  'https://mikhail.yandex.nomoredomains.monster',
];

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { StatusCode = 500, message } = err;
  res.status(StatusCode)
    .send({
      message: StatusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
