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

import { TeamModel } from './team.model.mjs';
import { TeamProjectModel } from './team-project.model.mjs';
import { ProjectBugModel } from '../projects/project-bug.model.mjs';
import { BugModel } from '../bugs/bug.model.mjs';
import { ProjectModel } from '../projects/project.model.mjs';
import { TeamBugModel } from './team-bug.model.mjs';

export class TeamsService {
  constructor() {}

  async createTeam(devTeam) {
    await TeamModel.create(devTeam);
  }

  async readAllTeams() {
    return TeamModel.find();
  }

  async readTeam(id) {
    const devTeam = await TeamModel.findOne({ code: id });

    if (!devTeam) {
      throw new Error(`Team ${ id } not found`);
    }
    return devTeam;
  }

  async updateTeam(id, devTeam) {
    await TeamModel.updateOne({ code: id }, devTeam);
  }

  async deleteTeam(id) {
    await TeamModel.deleteOne({ code: id });
  }

  async assignProject(teamCode, projectCode) {
    await TeamProjectModel.create({ teamCode: teamCode, projectCode: projectCode });
  }

  async readProjects(teamCode) {
    const projectCodes = await TeamProjectModel.find({ teamCode: teamCode });
    const projects = [];

    for (const code of projectCodes) {
      const project = await ProjectModel.findOne({ code: code.projectCode });
      projects.push(project);
    }
    return projects;
  }

  async assignBug(teamCode, bugCode) {
    await TeamBugModel.create({ teamCode: teamCode, bugCode: bugCode });
  }

  async readBugs(teamCode) {
    const bugCodes = await TeamBugModel.find({ teamCode: teamCode });
    const bugs = [];

    for (const code of bugCodes) {
      const bug = await BugModel.findOne({ code: code.bugCode });
      bugs.push(bug);
    }
    return bugs;
  }
}
