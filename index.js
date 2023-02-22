const express = require('express');
const routes = require('./src/routes/routes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/todo', routes);
const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));