/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  code: { type: Number, unique: true },
  name: String,
  startDate: Date,
  endDate: Date,
});
export const ProjectModel = mongoose.model('Project', ProjectSchema);
