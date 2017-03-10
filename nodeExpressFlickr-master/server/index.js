// server/index.js
'use strict';
var cors = require('cors')

const app = require('./app');

const PORT = process.env.PORT || 9000;
app.use(cors());


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
