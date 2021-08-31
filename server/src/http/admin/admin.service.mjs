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

import { BugModel } from '../bugs/bug.model.mjs';

export class AdminService {
  constructor() {}

  async assignBug(bugId, devTeamId) {}

  async readAllBugStats() {
    const bugs = await BugModel.find();
    const stats = {
      new: 0,
      assigned: 0,
      finished: 0
    };

    for (const bug of bugs) {
      if (bug.state === 'New') {
        stats.new++;
      }
      else if (bug.state === 'Assigned') {
        stats.assigned++;
      }
      else {
        stats.finished++;
      }
    }
    return stats;
  }
}
