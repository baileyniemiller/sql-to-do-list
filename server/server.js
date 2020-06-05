const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

app.get('/', (req, res) => res.send('Welcome to pg tester'));

// test to check if DB is connected successful
app.get('/dbtest', (req, res) => {
    pool.query("Select 1;")
        .then(() => res.send('Database Connected Successfully!'))
        .catch((error) => res.send(`Error Connecting to Database: ${error}`));
});











const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});