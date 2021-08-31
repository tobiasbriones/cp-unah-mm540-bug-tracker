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

const Schema = mongoose.Schema;
const TeamSchema = new Schema({
  code: { type: Number, unique: true },
  name: String,
  languages: [String],
  tech: [String]
});
export const TeamModel = mongoose.model('Team', TeamSchema);
