/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const SoftwareProjectShema = new Schema({
  code: Number,
  name: String,
  startDate: Date,
  endDate: Date,
});
export const SoftwareProjectModel = mongoose.model('SoftwareProject', SoftwareProjectShema);
