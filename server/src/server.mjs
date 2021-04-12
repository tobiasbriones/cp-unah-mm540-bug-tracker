/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import express from 'express';
import cors from 'cors';
import { newMongooseDb } from './database/db.mjs';
import { HttpModule } from './http/http.module.mjs';

const PORT = 3000;

newMongooseDb().then(listen, onDbError);

async function listen() {
  const app = express();
  const httpModule = new HttpModule();

  app.use(express.json());
  app.use(cors());
  httpModule.init(app);

  app.listen(PORT, onListen);
}

function onListen(err) {
  const onError = () => console.log(`Failed to run app: ${ err }`);
  const onRun = () => console.log(`Server running on port ${ PORT }`);

  if (err) {
    onError(err);
  }
  else {
    onRun();
  }
}

function onDbError(err) {
  console.log(`Failed to connect to the database: ${ err }`);
}
