const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const sequelize = require('./src/database');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');
  app.use(cors());
  next();
});

app.use(express.json());
app.use(routes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server running in http://localhost:3000');
  });
});