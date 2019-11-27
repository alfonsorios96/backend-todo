const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const services = require('./services');
const middlewares = require('./middlewares');

app.post('/auth', services.authenticate.auth);

const catalogRoute = express.Router();

catalogRoute.use(middlewares.authenticate.authorize);

catalogRoute.get('/', (request, response) => {
    response.status(200).json([{
        uid: 'eg721ge71ge7121',
        name: 'guts-component',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/SubtractiveColorMixing.png/200px-SubtractiveColorMixing.png',
        url: `${process.env.DOMAIN}/catalog/guts-component.min.js`
    },
        {
            uid: 'toto',
            name: 'toto-component',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/SubtractiveColorMixing.png/200px-SubtractiveColorMixing.png',
            url: `${process.env.DOMAIN}/catalog/toto-component.min.js`
        }]);
});

catalogRoute.get('/:appId', (request, response) => {
    const appId = request.params.appId;
    response.status(200).json([
        {
            uid: 'eg721ge71ge7121',
            name: 'guts-component',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/SubtractiveColorMixing.png/200px-SubtractiveColorMixing.png',
            url: `${process.env.DOMAIN}/catalog/guts-component.min.js`
        },
        {
            uid: 'toto',
            name: 'toto-component',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/SubtractiveColorMixing.png/200px-SubtractiveColorMixing.png',
            url: `${process.env.DOMAIN}/catalog/toto-component.min.js`
        }].filter(app => app.uid === appId).pop());
});

catalogRoute.use('/cdn', express.static(path.join(__dirname, 'components')));

app.use('/catalog', catalogRoute);

app.listen(PORT);

console.log(colors.green('Magic happens at http://localhost:' + PORT));