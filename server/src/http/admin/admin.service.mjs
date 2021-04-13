/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
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
