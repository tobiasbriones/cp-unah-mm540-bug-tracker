/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const mongoose = require('mongoose');
const host = '127.0.0.1';
const port = '27017';
const document = 'bug_tracker';
const uri = `mongodb://${ host }:${ port }/${ document }`;

exports.newMongooseDb = function() {
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  return mongoose.connect(
    uri,
    options
  );
};
