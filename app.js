require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const error = require('./middlewares/error');
const limiter = require('./middlewares/rateLimiter');
const { DB_ADRESS_DEV } = require('./utils/constants');

const { PORT = 4000 } = process.env;
const { DB_ADRESS, NODE_ENV } = process.env;
mongoose.connect(NODE_ENV === 'production' ? DB_ADRESS : DB_ADRESS_DEV, {
  useNewUrlParser: true,
});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
