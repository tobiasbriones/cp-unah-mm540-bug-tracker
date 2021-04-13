/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TeamProjectSchema = new Schema({
  teamCode: { type: Number },
  projectCode: { type: Number },
});
export const TeamProjectModel = mongoose.model('TeamProject', TeamProjectSchema);
