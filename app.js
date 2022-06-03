const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

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

app.listen(8000);