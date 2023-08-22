const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const error = require('./middlewares/error');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
