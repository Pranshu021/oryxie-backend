const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongoSanitize());

app.get('/api/test', (req, res) => {
    res.json({ message: 'API working' });
});

app.listen(3001);