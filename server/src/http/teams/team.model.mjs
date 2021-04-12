/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TeamSchema = new Schema({
  code: { type: Number, unique: true },
  name: String,
  languages: [String],
  tech: [String]
});
export const TeamModel = mongoose.model('Team', TeamSchema);
