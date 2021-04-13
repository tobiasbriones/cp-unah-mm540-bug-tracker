/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ProjectBugSchema = new Schema({
  projectCode: { type: Number },
  bugCode: { type: Number },
});
export const ProjectBugModel = mongoose.model('ProjectBug', ProjectBugSchema);
