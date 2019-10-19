const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const services = require('./services');
const middlewares = require('./middlewares');

app.post('/auth', services.authenticate.auth);

app.listen(PORT);

console.log(colors.green('Magic happens at http://localhost:' + PORT));