const express = require('express');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const ResponseFormatter = require('../../Commons/response/ResponseFormatter');
const authenticationRoute = require('../../Interfaces/http/api/auth/routes');

const server = express();

server.get('/', (req, res) => res.status(200).send(ResponseFormatter.success(
  'OK',
)));

server.use(express.json());

server.use(authenticationRoute);

// Log Here

// Error handler
server.use((err, req, res, next) => {
  if (err instanceof Error) {
    // bila response tersebut error, tangani sesuai kebutuhan
    const translatedError = DomainErrorTranslator.translate(err, err.errors);

    // penanganan client error secara internal.
    const output = err.errors?.reduce((acc, error) => {
      const fieldName = error.path[0];
      if (!acc[fieldName]) {
        acc[fieldName] = [];
      }
      acc[fieldName].push(error.message);
      return acc;
    }, {});

    if (translatedError instanceof ClientError) {
      res.status(translatedError.statusCode)
        .send(ResponseFormatter.error(translatedError.message, output));

      return;
    }

    // return;
    // penanganan server error sesuai kebutuhan
    // res.status(500).send(ResponseFormatter.error('terjadi kegagalan pada server kami', []));
    // console.log(err);
    res.status(500).send(err);
  }
});

module.exports = server;
