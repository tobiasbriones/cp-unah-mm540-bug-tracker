/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BugSchema = new Schema({
  code: Number,
  description: String,
  swProjectCode: Number,
  priority: { type: Number, min: 1, max: 5 },
  state: [
    'New', 'Assigned', 'Finished'
  ],
  finishDate: Date
});
exports.BugModel = mongoose.model('Bug', BugSchema);
