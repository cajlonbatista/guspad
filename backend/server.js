require('dotenv').config();
const port = 8080;
const express = require('express');
const mongoose = require('mongoose');
const reall = require('require-dir');
const cors = require('cors');

const app = express();

mongoose.connect(`${process.env.DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

reall('./src/models');
require('./src/controllers/Auth')(app);
app.use('/api', require('./src/routes/routes'));

app.get('/', (req, res) => {
  return res.status(200).json({
    title: 'Notes',
    author: 'Francisco Cajlon'
  });
});


app.listen(process.env.PORT || port, console.log(`Server listen in port ${port}`));