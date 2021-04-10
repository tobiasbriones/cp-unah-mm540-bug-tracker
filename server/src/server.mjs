/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import express from 'express';
import cors from 'cors';
import { newMongooseDb } from './database/db.mjs';
import { HttpModule } from './http/http.module.mjs';

const port = 3000;
const httpModule = new HttpModule();

newMongooseDb().then(listen, onDbError);

async function listen() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  httpModule.init(app);

  app.listen(port, () => {
    console.log(`Server running on port ${ port }`);
  });
}

function onDbError(err) {
  console.log(err);
}