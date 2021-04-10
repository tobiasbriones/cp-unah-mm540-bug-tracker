/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const host = '127.0.0.1';
const port = '27017';
const document = 'bug_tracker';
const uri = `mongodb://${ host }:${ port }/${ document }`;

export function newMongooseDb() {
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  return mongoose.connect(
    uri,
    options
  );
}
