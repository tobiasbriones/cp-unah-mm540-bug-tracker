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

import { BugModel } from './bug.model.mjs';

export class BugsService {
  constructor() {}

  async setFinished(code) {
    const bug = await BugModel.findOne({ code: code });

    bug.state = 'Finished';
    bug.finishDate = new Date().toISOString();
    await BugModel.updateOne({ code: code }, bug);
  }

  async setAssigned(code) {
    const bug = await BugModel.findOne({ code: code });

    bug.state = 'Assigned';
    await BugModel.updateOne({ code: code }, bug);
  }
}
