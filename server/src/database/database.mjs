/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const HOST = '127.0.0.1';
const PORT = '27017';
const DOC = 'bug_tracker';
const URI = `mongodb://${ HOST }:${ PORT }/${ DOC }`;

export function newMongooseDb() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };
  return mongoose.connect(URI, options);
}
