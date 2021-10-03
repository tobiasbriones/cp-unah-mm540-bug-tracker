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
const BugSchema = new Schema({
  code: { type: Number, unique: true },
  description: String,
  priority: { type: Number, min: 1, max: 5 },
  state: {
    type: String,
    enum: [
      'New', 'Assigned', 'Finished'
    ]
  },
  finishDate: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});
export const BugModel = mongoose.model('Bug', BugSchema);
