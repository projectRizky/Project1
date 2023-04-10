/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const createServer = require('./Infrastructures/http/createServer');

createServer.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
