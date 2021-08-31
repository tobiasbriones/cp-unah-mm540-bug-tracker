/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * This file is part of Course Project at UNAH-MM540: Bug Tracker.
 *
 * This source code is licensed under the BSD-3-Clause License found in the
 * LICENSE file in the root directory of this source tree or at
 * https://opensource.org/licenses/BSD-3-Clause.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id: { type: Number, unique: true },
  full_name: { type: String },
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'dev', 'qa']
  }
});

UserSchema.pre(
  'save',
  async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model('User', UserSchema);
