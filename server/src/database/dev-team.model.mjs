/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const DevTeamSchema = new Schema({
  code: Number,
  name: String,
  languages: [String],
  tech: [String]
});
export const DevTeamModel = mongoose.model('DevTeam', DevTeamSchema);
