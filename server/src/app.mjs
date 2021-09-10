/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * This file is part of Course Project at UNAH-MM540: Bug Tracker.
 *
 * This source code is licensed under the BSD-3-Clause License found in the
 * LICENSE file in the root directory of this source tree or at
 * https://opensource.org/licenses/BSD-3-Clause.
 */

import express from 'express';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import { newMongooseDb } from './database.config.mjs';
import { AppModule } from './app.module.mjs';

const PORT = 3000;

dotenv();
newMongooseDb().then(listen, onDbError);

async function listen() {
  const app = express();
  const httpModule = new AppModule();

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
