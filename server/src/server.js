/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const express = require('express');
const router = express.Router();
const cors = require('cors');
const http = require('./http/http.module');
const db = require('./database/db');
const port = 3000;

http.init(router);

db.newMongooseDb().then(listen, onDbError);

async function listen() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('', router);
  app.listen(port, () => {
    console.log(`Server running on port ${ port }`);
  });
}

function onDbError(err) {
  console.log(err);
}
