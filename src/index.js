const express = require('express');
var cors = require('cors');
var request = require('request');


// request.debug = true;

const app = express();
app.use(cors());
app.listen(process.env.PORT || 8002);

app.get('/', (req, resp) => resp.send('API Desafio Node.js'));

app.post('/programming', (req, resp) => {
    let now = new Date();
    let date = now.getUTCFullYear() + '-';
    date += (now.getMonth() + 1) + '-';
    date += now.getDate();

    if (!!req.query.date && /^\d{4}-\d{2}-\d{2}$/.test(req.query.date))
        date = req.query.date;

    request({
        uri: 'https://epg-api.video.globo.com/programmes/1337',
        method: 'GET',
        qs: {
            date: date,
        },
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            resp.json(JSON.parse(body));
        } else {
            resp.json(error);
        }
    })
});