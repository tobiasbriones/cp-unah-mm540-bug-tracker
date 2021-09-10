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

import mongoose from 'mongoose';

export function newMongooseDb() {
  const URI = getUri();
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };
  return mongoose.connect(URI, options);
}

function getUri() {
  const HOST = process.env.DB_HOST;
  const PORT = process.env.DB_PORT;
  const DOC = process.env.DB_DOC;
  return `mongodb://${ HOST }:${ PORT }/${ DOC }`;
}
