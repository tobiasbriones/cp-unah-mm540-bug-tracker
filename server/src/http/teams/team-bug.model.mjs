/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TeamBugSchema = new Schema({
  teamCode: { type: Number },
  bugCode: { type: Number },
});
export const TeamBugModel = mongoose.model('TeamBug', TeamBugSchema);
