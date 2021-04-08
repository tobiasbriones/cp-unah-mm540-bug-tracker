/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DevTeamSchema = new Schema({
  code: Number,
  name: String,
  languages: [String],
  tech: [String]
});
exports.DevTeamModel = mongoose.model('DevTeam', DevTeamSchema);
