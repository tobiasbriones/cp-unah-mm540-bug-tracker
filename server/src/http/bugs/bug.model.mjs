/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const BugSchema = new Schema({
  code: {type: Number, unique: true},
  description: String,
  priority: { type: Number, min: 1, max: 5 },
  state: {
    type: String,
    enum: [
      'New', 'Assigned', 'Finished'
    ]
  },
  finishDate: Date
});
export const BugModel = mongoose.model('Bug', BugSchema);
