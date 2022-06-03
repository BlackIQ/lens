const express = require('express');
const mongoose = require('mongoose');
const randomstring = require('randomstring');

const Link = require('./modules/link');

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
    const newLinkData = {
        link: req.body.link,
        lensLink: randomstring.generate({length: 5, charset: 'alphabetic'}),
        views: 0
    };

    const newLink = new Link(newLinkData);

    newLink.save()
        .then((result) => res.redirect(`/check/${result._id}`))
        .catch((error) => res.send(error));
});

app.get('/check/:id', (req, res) => {
    Link.findById(req.params.id)
        .then((link) => res.render('check', {link}))
        .catch((error) => res.send(error));
});

app.get('/link/:link', (req, res) => {
    const outConst = {
        link: req.params.link
    };

    res.render('link', outConst);
});