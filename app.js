const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const env = process.env;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const mdb = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_DATABASE}.ji4jf.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mdb)
    .then((connection) => {
        console.log('connected');
        app.listen(env.PORT || 8000);
    })
    .catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/new', (req, res) => {
    res.send(req.body);
});

app.get('/link/:link', (req, res) => {
    const outConst = {
        link: req.params.link
    };

    res.render('link', outConst);
});