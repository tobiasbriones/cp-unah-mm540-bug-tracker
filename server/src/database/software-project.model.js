/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SoftwareProjectShema = new Schema({
  code: Number,
  name: String,
  startDate: Date,
  endDate: Date,
});
exports.SoftwareProjectModel = mongoose.model('SoftwareProject', SoftwareProjectShema);
