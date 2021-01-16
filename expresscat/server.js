const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const middlewares = require('./middlewares')
const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(express.json());

const catRoute = require('./routes/catbox.js');
app.use('/catbox/', catRoute);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(3040, () => console.log('Server started on port 3040'))