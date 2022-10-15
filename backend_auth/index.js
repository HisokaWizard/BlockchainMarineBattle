const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/router');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT ?? 9000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Application run on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
